const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const image = sequelize.define('image', {
    idProduct: {
        allowNull: false,
        type: Sequelize.STRING
    },
    dir: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = image;