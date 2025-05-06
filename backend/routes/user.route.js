const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/list', userController.getUsers);
router.get('/list/:id', userController.getUsers);
router.post('/new', userController.createUser);

module.exports = router;