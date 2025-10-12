require('dotenv').config();
const express = require('express');

const { connectDB, sequelize } = require('./src/database/database');
const userRoutes = require('./src/routes/user.routes');
const assetsRoutes = require('./src/routes/assets.routes');
const { verifyToken } = require('./src/middleware');

require('./src/model/User');
require('./src/model/Assets');
require('./src/model/associations');

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);
app.use(verifyToken);
app.use('/api/assets', assetsRoutes);

sequelize.sync()
connectDB() 
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`)
})