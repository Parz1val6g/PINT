const express = require('express');
const router = express.Router();
const AvaliarController = require('../controllers/avaliar.controller');

router.get('/', AvaliarController.getAllFormandos);
router.get('/:id', AvaliarController.getFormandoById);
router.post('/:id', AvaliarController.avaliarFormando);

module.exports = router;
