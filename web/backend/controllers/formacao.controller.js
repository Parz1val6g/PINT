const formacaoData = require("../data/formacao.mock");

exports.getFormacao = (req, res) => {
  res.status(200).json(formacaoData);
};
