const router = require('express').Router();
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

router.get('/trip-location', (req, res) => {

    let results = [];
    let tripLatLongs = [];
    fs.createReadStream(path.join(__dirname, '../../../uploads/file.csv'))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results = results.slice(1, (results.length)/10);

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

router.get('/booking-method', (req, res) => {
    let results = [];
    let bookingData = [];
    fs.createReadStream(path.join(__dirname, '../../../uploads/file.csv'))
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
                        accumulator.push({y:x,x: element.createdAt, z:y})           // if no element is present in accumulator i.e at statrting
                    }
                    if(elem.x == element.createdAt){                                //if we have elmeent with same date
                        if(element.online_booking==1){
 
                            accumulator[index].y++;
                        }
                        if(element.mobile_site_booking==1){

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
        
        res.status(200).json({stats: bookingData});
    });
})

module.exports = router;