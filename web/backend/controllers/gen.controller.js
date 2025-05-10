const model = require('../models/gen.model');

exports.get = async (req, res) => {
    const { table } = req.params;
    try {
        res.status(200).json(await model.get(table));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.del = async (req, res) => {
    const { table, id } = req.params;
    try {
        await model.del(table, id);
        res.status(200).json({ message: `Registro removido com sucesso da tabela ${table} com ID ${id}` });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.set = async (req, res) => {
    const { table } = req.params;
    const data = req.body;
    try {
        res.status(201).json({ message: 'Registro inserido com sucesso', data: await model.add(table, data) });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


