const db = require('../config/db');

async function getAllData(table) {
    try {
        return (await db.query('SELECT * FROM ' + table)).rows;
    } catch (err) {
        console.error('Erro ao buscar tabela:', err);
        throw new Error('Erro ao buscar tabela');
    }
}

async function getDataById(table, id) {
    try {
        return (await db.query('SELECT * FROM ' + table + ' WHERE id = ' + id)).rows;
    } catch (err) {
        console.error('Erro ao buscar dados por id ' + id + ': ', err);
        throw new Error('Erro ao buscar dados por id ' + id);
    }
}

async function createRow(name, email) {
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
