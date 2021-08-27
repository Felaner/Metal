const Sequelize = require('sequelize')

const DB_NAME = 'ironbull'
const USER_NAME = 'root'
const PASSWORD = 'P3jdmVrbWWnH5K*pA0lL'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize