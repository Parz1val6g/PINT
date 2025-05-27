const db = require('../conf/db');
const tables = require('../conf/tables');

async function getTableColumns(table_name) {
    try {
        return (await db.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = $1
        `, [table_name])).rows.map(row => row.column_name);
    } catch (err) {
        console.error('Erro ao buscar colunas da tabela:', err);
        throw new Error('Erro ao buscar colunas da tabela');
    }
}

module.exports = {
    async get(table_name) {
        try {
            const table_data = tables.find(({ name }) => name === table_name);
            if (!table_data) throw new Error(`Tabela ${table_name} não encontrada`);
            return (await db.query(`SELECT * FROM ${table_data.name}`)).rows;
        } catch (err) {
            console.error(`Erro ao buscar tabela ${table_name}:`, err);
            throw err;
        }
    },
    async set(table, data) {
        try {
            const columns = await getTableColumns(table);
            console.log(columns);
            const columnNames = Object.keys(data);
            const invalidColumns = columnNames.filter(col => !columns.includes(col));
            if (invalidColumns.length > 0) throw new Error(`Colunas inválidas fornecidas: ${invalidColumns.join(', ')}`);
            return (await db.query(`
            INSERT INTO ${table} (${columnNames.join(', ')})
            VALUES (${columnNames.map(col => `'${data[col]}'`).join(', ')});
        `)).rows[0];
        } catch (err) {
            console.error('Erro ao gerar script de inserção de linha:', err);
            throw err;
        }
    },
    async del(table, id) {
        try {
            await db.query(`DELETE FROM ${table} WHERE id = ${id}`);
        } catch (err) {
            console.error('Erro ao eliminar registo da tabela ' + table + ' com o id ' + id);
            throw err;
        }
    }
};