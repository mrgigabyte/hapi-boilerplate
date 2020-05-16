const Routes = require('./routes')
const pkg = require('./package.json')

module.exports = {
  name: pkg.name,
  version: pkg.version,
  register: async function (server, options) {
    await server.route(Routes(server))
  }
}
