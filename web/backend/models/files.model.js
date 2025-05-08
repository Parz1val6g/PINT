const db = require('/conf/db.js')
require('dotenv').config();

async function list(id = null) {
    try {
        if (id) {
            const result = await db.query('SELECT * FROM files WHERE id = $1', [id]);  // $1 é um placeholder
            return result.rows[0];
        } else {
            const result = await db.query('SELECT * FROM files');
            return result.rows;
        }
    } catch (err) {
        console.error('Erro ao buscar ficheiro/s:', err);
        throw new Error('Erro ao buscar ficheiro/s');
    }
}

async function db_save({ name, path, type, extension }) {
    return db.query('INSERT INTO files (name, path, type, extension) VALUES ($1, $2, $3, $4)', [name, path, type, extension]);
}
module.exports = { list, db_save }