const db = require('../conf/db.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function list(id = null) {
    try {
        const query = id ? 'SELECT * FROM files WHERE id = $1' : 'SELECT * FROM files';
        const params = id ? [id] : [];
        const result = await db.query(query, params);
        return id ? result.rows[0] : result.rows;
    } catch (err) {
        console.error('Erro ao buscar ficheiro/s:', err);
        throw new Error('Erro ao buscar ficheiro/s');
    }
}

async function dbSave({ name, type, extension }) {
    try {
        await db.query(
            'INSERT INTO files (name, type, extension) VALUES ($1, $2, $3)',
            [name, type, extension]
        );
        return { success: true };
    } catch (err) {
        console.error('Erro ao guardar no DB:', err);
        throw new Error('Erro ao guardar no DB');
    }
}

async function getFilePath(filename) {
    // const filePath = path.resolve(__dirname, '..', 'files', filename);
    const filePath = path.join(__dirname, '..', 'files', filename);
    if (!fs.existsSync(filePath)) {
        const err = new Error('Ficheiro não encontrado');
        err.code = 404;
        throw err;
    }
    return filePath;
}

module.exports = { list, dbSave, getFilePath };
