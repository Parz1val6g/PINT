const express = require('express');
const router = express.Router();
const controller = require('../controllers/gen.controller');
const middleware = require('../middlewares/upload.middleware');
const fileController = require('../controllers/files.controller');

router.get('/get/:table', controller.get); // http://localhost:3000/get/:files

router.get('/del/:table/:id', controller.del); // http://localhost:3000/del/:files/:1

router.post('/set/:table', controller.set);     //http://localhost:3000/set/:files
// POST PART:
// {
//     "path": "path/to/file",
//     "file": "file_name",
//     "extension": "txt"
// }

router.post('/upload', middleware.single('ficheiro'), fileController.upload);
router.get('/download/:filename', fileController.download);

module.exports = router;