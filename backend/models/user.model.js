const db = require('../conf/db');

async function getAllUsers() {
  try {
    const result = await db.query('SELECT * FROM utilizadores');
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar utilizadores:', err);
    throw new Error('Erro ao buscar utilizadores');
  }
}

async function getUserById(id) {
  try {
    const result = await db.query('SELECT * FROM utilizadores WHERE id = ' + id);
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar utilizador com id ' + id + ':', err);
    throw new Error('Erro ao buscar utilizador com id ' + id);
  }
}

async function createUser(name, email) {
  try {
    const result = await db.query(
      'INSERT INTO utilizadores (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao criar utilizador:', err);
    throw new Error('Erro ao criar utilizador');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
