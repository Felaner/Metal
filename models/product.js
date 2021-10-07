const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const product = sequelize.define('products', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    short_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preview: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = product;