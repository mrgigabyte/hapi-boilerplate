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

// module.exports = server

// server.route({
//   method: 'GET',
//   path: '/',
//   handler: (request, h) => {
//     console.log('asdsads')
//     return 'I am the home route'
//   }
// })

routes.init(server)

server.events.on('request', (event, tags) => {
  if (tags.error) {
    console.log(`Server error: ${tags}`)
  }
})
