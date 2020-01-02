import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { loggers } from 'winston'
const routes = require('./routes')
const Hapi = require('@hapi/hapi')
const config = require('./config/config')
// const HapiSwagger = require('hapi-swagger')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Pack = require('../../package.json')

// console.log(config, config.host, config.port)

const server = new Hapi.Server({
  host: config.server.host,
  port: config.server.port
})

const plugins = config.server.plugins
const pluginsToRegister = [Inert, Vision]

const launch = async () => {
  try {
    // Registering Plugins
    plugins.forEach((pluginName) => {
      const plugin = (require('./plugins/' + pluginName)).default()
      console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`)
      pluginsToRegister.push(plugin.register())
    })

    await server.register(pluginsToRegister)
    await server.start()
  } catch (err) {
    console.log(err)
    loggers.error(err)
    process.exit(1)
  }

  console.log(server.info)
  console.log(`Server is running at ${server.info.uri}`)
  console.log(Pack.version)
}

launch()

if (process.env.NODE_ENV !== 'prod') {
  server.events.on('response', function (request) {
    console.log(`[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${request.info.remoteAddress} : ${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}  `)
  })
}

// Initialising Routes and Database

routes.init(server)
