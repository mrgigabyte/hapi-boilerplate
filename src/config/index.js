const env = process.env.NODE_ENV // 'dev' or 'test' or 'prod'
const configObj = require(`./config.${env}.json`)
if (process.env.NODE_ENV === 'dev') {
  const Pack = require('../../../package.json')
  configObj.plugins['hapi-swagger'].info.title = Pack.name
  configObj.plugins['hapi-swagger'].info.version = Pack.version
}

configObj.auth.secret = process.env.SECRET_KEY || configObj.auth.secret

module.exports = configObj
