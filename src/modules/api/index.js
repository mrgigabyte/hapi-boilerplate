const { responseType } = require('./helpers')

module.exports = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    const preResponse = (request, h) => {
      const response = request.response
      let reformated = {}

      if (response.isBoom) {
        reformated.statusCode = response.output.payload.statusCode
        reformated.type = response.output.payload.error
        reformated.errors = [{ message: response.output.payload.message }]
        return h.response(reformated).code(reformated.statusCode)
      }

      if (!response.isBoom & ![200, 201].includes(response.statusCode)) {
        reformated.statusCode = response.statusCode
        reformated.type = responseType[response.statusCode]
        reformated = { ...reformated, ...response.source }
        return h.response(reformated).code(reformated.statusCode)
      }

      return h.continue
    }

    await server.register(require('./users'))

    server.ext('onPreResponse', preResponse)
  }
}
