const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/upload.middleware');
const controller = require('../controllers/files.controller');

router.post('/upload', middleware.single('ficheiro'), controller.upload);
router.get('/download/:filename', controller.download);

module.exports = router;