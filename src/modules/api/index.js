const pkg = require('./package.json')

module.exports = {
  name: pkg.name,
  version: pkg.version,
  register: async function (server, options) {
    const preResponse = (request, h) => {
      const response = request.response
      const reformated = {
        error: {}
      }

      if (response.isBoom) {
        if (response.output.payload.statusCode) {
          reformated.error.code = response.output.payload.statusCode
          reformated.error.type = response.output.payload.error
          const headers = response.output.headers
          if (headers['WWW-Authenticate']) {
            reformated.details = [{ message: headers['WWW-Authenticate'] }]
          } else {
            reformated.details = [{ message: response.output.payload.message }]
          }
          return h.response(reformated).code(reformated.error.code)
        }
      }

      return h.continue
    }

    await server.register(require('./users'))

    server.ext('onPreResponse', preResponse)
  }
}
