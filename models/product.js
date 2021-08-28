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
    descr: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = product;