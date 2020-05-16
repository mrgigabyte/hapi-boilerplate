const { responseType } = require('./helpers')

module.exports = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    const preResponse = (request, h) => {
      const response = request.response
      const reformated = {
        error: {}
      }

      console.log(response.statusCode)

      if (response.isBoom) {
        reformated.error.code = response.output.payload.statusCode
        reformated.error.type = response.output.payload.error
        reformated.details = [{ message: response.output.payload.message }]
        return h.response(reformated).code(reformated.error.code)
      }

      if (!response.isBoom & ![200, 201].includes(response.statusCode)) {
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', response)
        reformated.error.code = response.statusCode
        reformated.error.type = responseType[response.statusCode]
        reformated.error.details = response.source.errors
        return h.response(reformated).code(reformated.error.code)
      }

      return h.continue
    }

    await server.register(require('./users'))

    server.ext('onPreResponse', preResponse)
  }
}
