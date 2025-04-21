const express = require('express');
const app = express();

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Rotas
app.use('/teste', (req, res) => {
    res.send('Rota TESTE.');
});

app.use('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app; // Export the app
