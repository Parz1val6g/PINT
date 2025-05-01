const db = require('../config/db');

async function getAllUsers() {
  const result = await db.query('SELECT * FROM utilizadores');
  return result.rows;
}

async function createUser(name, email) {
  const result = await db.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
}

module.exports = {
  getAllUsers,
  createUser
};
