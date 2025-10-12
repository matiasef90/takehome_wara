// server.js

require('dotenv').config();

const express = require('express');
const { connectDB, sequelize } = require('./src/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); 

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
});