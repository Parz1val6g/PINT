const fileModel = require('../models/file.model');

exports.upload = async (req, res) => {
  const { filePath } = req.params;

  if (!filePath) {
    return res.status(400).json({ message: 'O caminho do ficheiro é obrigatório.' });
  }

  try {
    const publicUrl = await fileModel.upload(filePath);
    return res.status(200).json({ message: 'Upload feito com sucesso.', url: publicUrl });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.download = async (req, res) => {
  const { fileName, downloadPath } = req.body;

  if (!fileName || !downloadPath) {
    return res.status(400).json({ message: 'Nome do ficheiro e caminho de download são obrigatórios.' });
  }

  try {
    const localPath = await fileModel.download(fileName, downloadPath);
    return res.status(200).json({ message: 'Download concluído com sucesso.', localPath });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
