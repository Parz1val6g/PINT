const express = require('express');
const router = express.Router();
const filesController = require('../controllers/files.controller');

router.post('/download', filesController.download);
router.get('/upload/:filePath', filesController.upload);

module.exports = router;