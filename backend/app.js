require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./src/database/database');
const userRoutes = require('./src/routes/user.routes');
require('./src/model/User');

const app = express();
const { PORT } = process.env;
app.use(express.json());
app.use('/api/user', userRoutes);
sequelize.sync();
connectDB(); 
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});