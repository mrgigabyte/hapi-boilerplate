const { logger } = require('../logger')
const { User } = require('../models')

// function log (request, reply) {
//   console.log('hey')
//   return 'Hello'
// }

function log (request, h) {
  return h.continue
}

export default function (server) {
  server.route([{
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
  },
  {
    method: 'GET',
    path: '/example',
    config: {
      handler: (request, h) => {
        return User.create({ name: 'abc' })
          .then((user) => {
            return h.response(user)
          }).catch(err => {
            logger.error(err)
            return h.response(err)
          })
      }
    }
  },
  {
    method: 'GET',
    path: '/todo',
    options: {
      handler: (request, h) => {
        logger.info('This is a test message')
        return 'I am the todo route'
      },
      description: 'Get todo',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'] // ADD THIS TAG
    }
  }
  ])
}
