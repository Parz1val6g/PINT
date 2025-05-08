const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext);
        cb(null, `${base}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });

module.exports = upload;