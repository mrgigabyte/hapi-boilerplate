const { logger } = require('./logger')
const Sequelize = require('sequelize')
const UserModel = require('./models/users')

const config = require('./config/config')
const db = config.database

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  pool: {
    max: db.pool.max,
    min: db.pool.min,
    acquire: db.pool.acquire,
    idle: db.pool.idle
  }
})

const User = UserModel(sequelize, Sequelize)

sequelize.sync().then(() => { logger.info('Database & tables created!') })

module.exports = {
  User
}
