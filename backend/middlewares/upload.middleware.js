const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.resolve(__dirname, '..', 'files'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err)
                return cb(err);
            cb(null, uploadPath);
        });
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext);
        cb(null, `${base}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });

module.exports = upload;
