const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const router = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router);

module.exports = app;
