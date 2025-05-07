const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user.route');
const filesRoutes = require('./routes/files.route');

app.use('/users', userRoutes);
app.use('/files',filesRoutes);

module.exports = app;