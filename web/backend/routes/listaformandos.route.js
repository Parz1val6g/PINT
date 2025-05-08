const express = require('express');
const router = express.Router();
const formandosMock = require('../data/listaformandos.mock');

router.get('/', (req, res) => {
  res.json(formandosMock);
});

module.exports = router;
