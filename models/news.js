const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const news = sequelize.define('news', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    dir: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = news;