const { logger } = require('./logger')
const Sequelize = require('sequelize')
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

function init () {
  sequelize.sync({ force: true }).then(() => { logger.info('Database & tables created!') }).catch((err) => { logger.error(err) })
}

module.exports = {
  sequelize,
  Sequelize,
  init
}

