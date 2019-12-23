const Hapi = require('@hapi/hapi')
const config = require('./config/config')

console.log(config, config.host, config.port)

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
