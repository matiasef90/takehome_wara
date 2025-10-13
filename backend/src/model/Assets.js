const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { assets } = require('../../config');

const Assets = sequelize.define('Assets', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: assets.status,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: assets.types,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    owner: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    }

}, {
    tableName: 'assets',
    timestamps: true
});

module.exports = Assets;