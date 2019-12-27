
// const server = require('../server')

export default function (server) {
  server.route({
    method: 'GET',
    path: '/',
    options: {
      log: {
        collect: true
      }
    },
    handler: (request, h) => {
      return 'I am the home route'
    }
  })
}
