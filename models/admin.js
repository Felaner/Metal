const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const admin = sequelize.define('admin', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = admin;