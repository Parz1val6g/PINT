const formandos = require('../data/avaliar.mock');

exports.getAllFormandos = (req, res) => {
  res.json(formandos);
};

exports.getFormandoById = (req, res) => {
  const { id } = req.params;
  const formando = formandos.find(f => f.id === parseInt(id));
  if (!formando) return res.status(404).json({ message: 'Formando não encontrado' });
  res.json(formando);
};

exports.avaliarFormando = (req, res) => {
  const { id } = req.params;
  const { nota, observacoes } = req.body;
  const formando = formandos.find(f => f.id === parseInt(id));
  if (!formando) return res.status(404).json({ message: 'Formando não encontrado' });

  formando.avaliado = true;
  formando.dataAvaliacao = new Date().toISOString().split('T')[0];
  formando.nota = nota;
  formando.observacoes = observacoes;

  res.status(200).json({ message: 'Avaliação registrada com sucesso', formando });
};
