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
    // let data = csvData();
    // res.status(200).json({data, success:true});
    let results = [];
    let tripLatLongs = [];
    console.log(path.join(__dirname, '../../uploads/file.csv'));
    fs.createReadStream(path.join(__dirname, '../uploads/file.csv'))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
        results = results.slice(1, (results.length)/10000);

        tripLatLongs = results.map(element => {
            return {
                from_lat: element.from_lat,
                from_long: element.from_long,
                to_lat: element.to_lat,
                to_long: element.to_long
            };
        });

        res.status(200).json({tripLoc: tripLatLongs});
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