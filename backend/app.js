const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
const userRoutes = require('./routes/user.route');

app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
