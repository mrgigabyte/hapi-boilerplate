const pkg = require('./package.json')
module.exports = {
  name: pkg.name,
  version: pkg.version,
  register: async function (server, options) {
    // const preResponse = (request, h) => {
    //   const response = request.response

    //   return h.continue
    // }

    await server.register(require('./users'))

    // server.ext('onPreResponse', preResponse)
  }
}
