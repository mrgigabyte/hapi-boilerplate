// require('core-js/stable')
// require('regenerator-runtime/runtime')
const { logger } = require('winston')
const Hapi = require('@hapi/hapi')
const config = require('./config')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')

const server = new Hapi.Server({
  host: config.server.host,
  port: config.server.port
})

const plugins = config.server.plugins
const pluginsToRegister = [Inert, Vision, { plugin: require('hapi-auth-jwt2') }]

const serverObj = async () => {
  try {
    // Registering Plugins
    plugins.forEach((pluginName) => {
      const plugin = (require('./plugins/' + pluginName)).default()
      pluginsToRegister.push(plugin.register())
      console.log(`Registered Plugin ${plugin.info().name} v${plugin.info().version}`)
    })
    await server.register(pluginsToRegister)
    await server.register([require('./modules/models'), require('./modules/auth'), require('./modules/api'), require('./modules/services')])
  } catch (err) {
    console.log(err)
    logger.error(err)
    process.exit(1)
  }
}

exports.init = async () => {
  await serverObj()
  return server
}

exports.start = async () => {
  try {
    await serverObj()
    await server.start()
    console.log(server.info)
    console.log(`Server is running at ${server.info.uri}`)
    return server
  } catch (err) {
    console.log(err)
    logger.error(err)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  try {
    console.log('\n...stopping the server')
    await server.stop({ timeout: 10000 })
    console.log('Server Stopped!')
    process.exit(0)
  } catch (err) {
    process.exit(1)
  }
})

// Logging all the requests on console
if (process.env.NODE_ENV !== 'prod') {
  server.events.on('response', function (request) {
    console.log(`[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${request.info.remoteAddress} : ${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}  `)
  })
}
