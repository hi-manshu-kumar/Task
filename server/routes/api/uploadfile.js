const router = require('express').Router();
const upload = require('../../middleware/upload');


router.post('/', (req, res) => {
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

module.exports = router;