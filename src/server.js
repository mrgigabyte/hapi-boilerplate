import 'core-js/stable'
import 'regenerator-runtime/runtime'
const routes = require('./routes')
const Hapi = require('@hapi/hapi')
const config = require('./config/config')

// console.log(config, config.host, config.port)

const server = new Hapi.Server({
  host: config.app.host,
  port: config.app.port
})

const launch = async () => {
  try {
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log(server.info)
  console.log(`Server is running at ${server.info.uri}`)
}

launch()

if (process.env.NODE_ENV !== 'prod') {
  server.events.on('response', function (request) {
    console.log(`[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${request.info.remoteAddress} : ${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}  `)
  })
}

routes.init(server)
