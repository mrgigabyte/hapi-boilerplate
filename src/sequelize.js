const { logger } = require('./logger')
const Sequelize = require('sequelize')
const UserModel = require('./models/users')

const config = require('./config/config')

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)

sequelize.sync().then(() => { logger.info('Database & tables created!') })

module.exports = {
  User
}
