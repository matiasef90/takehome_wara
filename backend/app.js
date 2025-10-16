require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connectDB, sequelize } = require('./src/database/database');
const userRoutes = require('./src/routes/user.routes');
const assetsRoutes = require('./src/routes/assets.routes');
const { verifyToken } = require('./src/middleware');

require('./src/model/User');
require('./src/model/Assets');

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use(verifyToken);
app.use('/api/assets', assetsRoutes);

sequelize.sync({alter: true})
connectDB() 
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`)
})

module.exports = app;