const express = require('express');
const morgan = require('morgan');
const upload = require('./middleware/upload');
const csvData = require('./middleware/csv-parser');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('task/build'));


app.post('/api/uploadFile',  (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({success: false, error: err});
        } else {
            if (req.file == undefined) {
                res.status(400).json({success: false, error: 'No file received'});
            } else {
                var fullPath = "uploads/" + req.file.filename;
                res.status(200).json({success: true, path: fullPath})
            }
        }
    });
});

app.get('/api/serveData/trip-location', (req, res) => {

    // res.status(200).json({data, success:true});
    
    let results = [];
    let tripLatLongs = [];
    console.log(path.join(__dirname, '../../uploads/file.csv'));
    fs.createReadStream(path.join(__dirname, '../uploads/file.csv'))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results = results.slice(1, (results.length)/10);

        // tripLatLongs = results.map(element => {
                        
        //     return {
        //         latitude: Number(element.from_lat),
        //         longitude: Number(element.from_long),
        //         // to_lat: element.to_lat,
        //         // to_long: element.to_long
        //     }
        // }).filter(
        //     element =>
        //     //   !isNaN(+element.from_lat) ||
        //     //   !isNaN(+element.from_long)
        //         // isNaN(Number(element.from_lat)) && isNaN(Number(element.from_long))
        //         {if(Number(element.from_lat) && Number(element.from_long)){
        //             return true
        //         }}
        // );
        tripLatLongs = results
        .filter(
            element =>
            {
                if(Number(element.from_lat) && Number(element.from_long))
                return element;
            }
        )
        .map(element => {
          return {
            latitude: Number(element.from_lat),
            longitude: Number(element.from_long)
          };
        })

        res.status(200).json({tripLoc: tripLatLongs});
    });
});

app.get('/api/serveData/booking-method', (req, res) => {
    let results = [];
    let bookingData = [];
    console.log(path.join(__dirname, '../../uploads/file.csv'));
    fs.createReadStream(path.join(__dirname, '../uploads/file.csv'))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results = results.slice(1, (results.length));

        bookingData = results.map(element => {                                      //for getting the data of booking and data
            return {
                mobile_site_booking : Number(element.mobile_site_booking),
                online_booking      : Number(element.online_booking),
                createdAt           : element.booking_created.split(" ")[0]
            }
        }).reduce((accumulator, element) => {

            let x=0,y=0;
            if(element.online_booking==1){
                x++;
            }
            if(element.mobile_site_booking==1){
                y++
            }
            if(element.createdAt){
                accumulator.forEach((elem, index) => {
                    if(!elem){
                        // console.log("hi2", accumulator)
                        accumulator.push({y:x,x: element.createdAt, z:y})           // if no element is present in accumulator i.e at statrting
                    }
                    if(elem.x == element.createdAt){                                //if we have elmeent with same date
                        if(element.online_booking==1){
                            // accumulator.online_booking++;
                            // x++;
                            accumulator[index].y++;
                        }
                        if(element.mobile_site_booking==1){
                            // accumulator.mobile_site_booking++;
                            // y++
                            accumulator[index].z++;
                        }

                        return accumulator;
                    } 
                })
                accumulator.push({y:x,x: element.createdAt, z:y})
            }
            
            return accumulator;
        }, 
        []);                                                                        // {online_booking:0, mobile_site_booking:0, createdAt: ""}
        // console.log(bookingData);
        
        res.status(200).json({stats: bookingData});
    });
});


// DEFAULT
if(  process.env.NODE_ENV === 'production' ){
    const path = require('path');
    app.get('/*', (req, res)=> {
        res.sendfile(path.resolve(__dirname, '../task', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});