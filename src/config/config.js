//  dotenv package
require('dotenv').config()

// config.js
const env = process.env.NODE_ENV // 'dev' or 'test' or 'prod'
const configObj = require(`./config.${env}.json`)

module.exports = configObj
