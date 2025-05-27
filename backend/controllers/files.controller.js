const model = require('../models/files.model');
const path = require('path');

exports.upload = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Nenhum ficheiro enviado' });

  const { filename, mimetype } = req.file;

  try {
    await model.dbSave({
      name: filename,
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

  try {
    const filePath = await model.getFilePath(filename);
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Erro ao transferir o ficheiro:', err);
        res.status(500).json({ message: 'Erro ao transferir o ficheiro' });
      }
    });
  } catch (err) {
    res.status(err.code || 500).json({ message: err.message || 'Erro interno do servidor' });
  }
};