const express = require('express');
const morgan = require('morgan');

const uploadFile = require('./routes/api/uploadfile')
const serveData = require('./routes/api/serveData')
const appRoutes = require('./utils/appRoutes');

const app = express();
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('task/build'));

app.use(appRoutes.uploadFile,  uploadFile);
app.use(appRoutes.serveData, serveData);

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