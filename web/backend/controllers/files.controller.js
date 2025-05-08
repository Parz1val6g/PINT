const path = require('path');
const fs = require('fs');
const model = require('../models/files.model');

exports.list = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const file = await model.list(id);
      if (!file) {
        return res.status(404).json({ message: 'Ficheiro não encontrado' });
      }
      return res.json(file);
    } else {
      const files = await model.list();
      return res.json(files);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao buscar ficheiro/s' });
  }
};

exports.upload = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Nenhum ficheiro enviado' });
  const { filename, path: filePath, mimetype } = req.file;
  try {
    await fileModel.db_save({
      name: filename,
      path: filePath,
      type: mimetype,
      extension: path.extname(filename),
    });
    res.status(201).json({ message: 'Ficheiro guardado com sucesso', filename });
  } catch (err) {
    console.error('Erro ao guardar no DB:', err);
    res.status(500).json({ message: 'Erro ao guardar o ficheiro' });
  }
};

exports.download = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Ficheiro não encontrado' });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Erro ao enviar o ficheiro:', err);
      res.status(500).json({ message: 'Erro ao transferir o ficheiro' });
    }
  });
}
