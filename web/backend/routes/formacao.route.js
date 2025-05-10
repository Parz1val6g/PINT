const express = require("express");
const router = express.Router();
const { getFormacao } = require("../controllers/formacao.controller");

router.get("/", getFormacao);

module.exports = router;
