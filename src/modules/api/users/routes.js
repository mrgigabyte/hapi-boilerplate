const inputValidations = require('./validations/input')
// const outputValidations = require('./validations/output')
// const Joi = require('@hapi/joi')

module.exports = (server) => {
  const handlers = require('./handlers')(server)
  return [
    // Register
    {
      method: 'POST',
      path: '/users',
      options: {
        validate: inputValidations.registerPayload,
        handler: handlers.createUser,
        // response: outputValidations.AuthOnRegisterOutputValidationConfig,
        description: 'Register a user',
        tags: ['api', 'users']
      }
    },
    // Login
    {
      method: 'POST',
      path: '/users/login',
      options: {
        validate: inputValidations.loginPayload,
        handler: handlers.loginUser,
        // response: outputValidations.AuthOnRegisterOutputValidationConfig,
        description: 'Login a user',
        tags: ['api', 'users']
      }
    },
    // Current User
    {
      method: 'GET',
      path: '/users',
      options: {
        auth: 'jwt',
        validate: inputValidations.GetCurrentPayload,
        handler: handlers.getCurrentUser,
        // response: outputValidations.AuthOnRegisterOutputValidationConfig,
        description: 'Get current user info',
        tags: ['api', 'users']
      }
    }
  ]
}
