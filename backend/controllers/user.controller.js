const userModel = require('../models/user.model');

exports.getUsers = async (req, res) => {
  const userId = req.params.id;

  try {
    if (userId) {
      const user = await userModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilizador não encontrado' });
      }
      return res.json(user);
    } else {
      const users = await userModel.getAllUsers();
      return res.json(users);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar utilizadores' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await userModel.createUser(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar utilizador' });
  }
};
