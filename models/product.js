const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const product = sequelize.define('products', {
  id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER
  },
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  description: {
      type: Sequelize.STRING,
      allowNull: false
  },
  price: {
      type: Sequelize.INTEGER,
      allowNull: false
  }
})

module.exports = product;