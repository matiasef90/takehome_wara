const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'database',
    dialect: 'postgres',
    port: 5432,
    logging: false
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL con Sequelize exitosa.');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
}

module.exports = { sequelize, connectDB };