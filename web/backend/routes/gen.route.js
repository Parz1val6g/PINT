const express = require('express');
const router = express.Router();
const controller = require('../controllers/gen.controller');

router.get('/get/:table', controller.get);
router.get('/del/:table/:id', controller.del);
router.post('/set/:table', controller.set);

module.exports = router;