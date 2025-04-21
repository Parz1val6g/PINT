console.log('Starting server setup...');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('Serving index.html...');
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Servidor está a correr em http://localhost:${PORT}`);
});

console.log('Server setup complete.');
