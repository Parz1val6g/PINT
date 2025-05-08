const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/forum.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', getPosts);
router.post('/', upload.single('file'), createPost);

module.exports = router;
