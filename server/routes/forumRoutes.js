const express = require('express');
const router = express.Router();
const { getPosts } = require('../controllers/forumController');

router.get('/posts', getPosts);

module.exports = router;
