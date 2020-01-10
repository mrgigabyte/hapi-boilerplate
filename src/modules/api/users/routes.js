const inputValidations = require('./validations/input')
// const outputValidations = require('./validations/output')

module.exports = (server) => {
  const handlers = require('./handlers')(server)
  return [
    // Register
    {
      method: 'POST',
      path: '/user',
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
      path: '/user/login',
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
      path: '/user',
      options: {
        auth: 'jwt',
        validate: inputValidations.getCurrentPayload,
        handler: handlers.getCurrentUser,
        // response: outputValidations.AuthOnRegisterOutputValidationConfig,
        description: 'Get current user info',
        tags: ['api', 'users']
      }
    },
    // Current User
    {
      method: 'PUT',
      path: '/user',
      options: {
        auth: 'jwt',
        validate: inputValidations.updatePayload,
        handler: handlers.updateUser,
        // response: outputValidations.AuthOnRegisterOutputValidationConfig,
        description: 'Update existing user info',
        tags: ['api', 'users']
      }
    }
  ]
}
