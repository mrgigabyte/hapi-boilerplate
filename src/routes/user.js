import logger from '../logger'
// const server = require('../server')

// function log (request, reply) {
//   console.log('hey')
//   return 'Hello'
// }

function log (request, h) {
  return h.continue
}

export default function (server) {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      pre: [
        { method: log, assign: 'm1' }
      ],
      handler: (request, h) => {
        logger.info('This is a test message')
        return 'I am the home route'
      }
    }
  })
}
