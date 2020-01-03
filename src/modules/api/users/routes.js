const inputValidations = require('./validations/input')
// const outputValidations = require('./validations/output')

module.exports = (server) => {
  const handlers = require('./handlers')(server)
  return [
    // Register
    {
      method: 'POST',
      path: '/users',
      options: {
        validate: inputValidations.RegisterPayload,
        handler: handlers.createUser,
        // response: outputValidations.AuthOnRegisterOutputValidationConfig,
        description: 'Register a user',
        tags: ['api', 'users']
      }
    }
  ]
}
