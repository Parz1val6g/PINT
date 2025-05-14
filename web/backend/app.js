const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user.route');
const filesRoutes = require('./routes/files.route');
const listaFormandosRoute = require('./routes/listaformandos.route');
const forumRoutes = require('./routes/forum.route');
const dashboardRoutes = require('./routes/dashboard.route');
const formacaoRoutes = require('./routes/formacao.route');
const avaliarRoutes = require('./routes/avaliar.route');

app.use('/api/avaliar', avaliarRoutes);
app.use('/api/formacao', formacaoRoutes);
app.use('/api/formandos', listaFormandosRoute);
app.use('/api/forum', forumRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/users', userRoutes);
app.use('/files', filesRoutes);

module.exports = app;
