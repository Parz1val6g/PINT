const express = require('express');
const router = express.Router();
const { getExample } = require('../controllers/exControllers');

router.get('/', getExample);

module.exports = router;
