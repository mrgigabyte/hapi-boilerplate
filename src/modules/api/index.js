const { responseType } = require('./helpers')

module.exports = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    const preResponse = (request, h) => {
      const response = request.response
      let reformated = {}
      console.log(response)
      // console.log(Object.keys(response.source.context))
      if (response.isBoom) {
        reformated.statusCode = response.output.statusCode
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

      //
      // if(Object.keys(response.source.context)[0]==='hapiSwagger')
      // {
      //  return h.continue
      // }
      return h.continue
      // return h.response(reformated).code(reformated.statusCode)
    }

    await server.register(require('./users'))

    server.ext('onPreResponse', preResponse)
  }
}
