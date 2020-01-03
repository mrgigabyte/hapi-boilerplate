const Routes = require('./routes')

module.exports = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    await server.route(Routes(server))
  }
}
