const { logger } = require('../../logger')
const Sequelize = require('sequelize')
const config = require('../../config/config')
const db = config.database

// Import models here
const UserModel = require('./User')

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

// function init () {
//    sequelize.sync({ force: true }).then(() => { logger.info('Database & tables created!') }).catch((err) => { logger.error(err) })
// }

function modelInstance () {
  return {
    user: UserModel(sequelize, Sequelize)
  }
}

module.exports = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    sequelize.sync({ force: true }).then(() => { logger.info('Database & tables created!') }).catch((err) => { logger.error(err) })
    server.method('models', modelInstance, {})
  }
}
