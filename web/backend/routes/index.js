const express = require('express');
const router = express.Router();
//const exampleRoutes = require('./example');

const userRoutes = require('./user.route'); //meu
const forumRoutes = require('./forum.route'); //meu

//router.use('/example', exampleRoutes);

router.use('/users', userRoutes); //meu
router.use('/forum', forumRoutes); //meu

module.exports = router;
