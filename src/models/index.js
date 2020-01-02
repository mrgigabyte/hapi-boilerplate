const UserModel = require('./users')
const { sequelize, Sequelize } = require('../sequelize')

const User = UserModel(sequelize, Sequelize)

module.exports = {
  User
}
