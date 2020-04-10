const env = process.env.NODE_ENV // 'dev' or 'test' or 'prod'
const configObj = require(`./config.${env}.json`)
const Pack = require('../../../package.json')

configObj.auth.secret = process.env.SECRET_KEY || configObj.auth.secret
configObj.plugins['hapi-swagger'].info.title = Pack.name
configObj.plugins['hapi-swagger'].info.version = Pack.version

module.exports = configObj
