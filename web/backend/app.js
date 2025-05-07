const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const router = require('./routes/index');

app.use(cors());
app.use(express.json());
<<<<<<< HEAD:backend/app.js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router);

module.exports = app;
=======

const userRoutes = require('./routes/user.route');
const filesRoutes = require('./routes/files.route');

app.use('/users', userRoutes);
app.use('/files',filesRoutes);

module.exports = app;
>>>>>>> 45574324c2de1d01dd63cac63dba137283f28de9:web/backend/app.js
