const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/avaliacao.controller');

router.get('/:id', AvaliacaoController.getFormandoById);
router.post('/:id', AvaliacaoController.avaliarFormando);

module.exports = router;
