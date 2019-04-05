const express = require('express');
const morgan = require('morgan');
const upload = require('./middleware/upload');
const csvData = require('./middleware/csv-parser');

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

app.get('/api/serveData', (req, res) => {
    let data = csvData();
    res.status(200).json({data, success:true});
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