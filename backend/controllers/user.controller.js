const userModel = require('../models/user.model');

exports.getUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
  res.send('user get');
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const newUser = await userModel.createUser(name, email);
  res.send('user created');
  res.status(201).json(newUser);
};
