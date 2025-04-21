const express = require('express');
const cors = require('cors');
const forumRoutes = require('./routes/forumRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/forum', forumRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend a correr em http://localhost:${PORT}`);
});
