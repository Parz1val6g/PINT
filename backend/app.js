const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./routes/gen.route');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/', route);

module.exports = app;
