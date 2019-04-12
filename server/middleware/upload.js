const multer = require('multer');
const path = require('path');

/** Storage Engine */
const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + path.extname(file.originalname));
    }
});

//init
const upload = multer({
    storage: storageEngine,
    fileFilter: function (req, file, callback) {
        validateFile(file, callback);
    }
}).single('file');


var validateFile = function (file, cb) {
    allowedFileTypes = /csv/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    // const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension ) {
        return cb(null, true);
    } else {
        return cb(res.status(400).end('Invalid file type. Only csv file are allowed.'),false)
    }
}

module.exports = upload;