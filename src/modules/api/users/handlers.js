const replyHelper = require('../helpers')
const Boom = require('@hapi/boom')

module.exports = (server) => {
  function constructAuthUserResponse (user) {
    const authUser = { user: user.toAuthJSON() }
    return authUser
  }

  return {
    /**
     * POST /user/login
     * @param {*} request
     * @param {*} h
     */
    async loginUser (request, h) {
      const payload = request.payload
      try {
        const user = await server.methods.services.users.getByEmail(payload.user.email)

        if (!user) {
          return Boom.notFound('no account associated with given email id')
        }

        if (!user.validPassword(payload.user.password)) {
          return Boom.unauthorized('email or password missmatch!')
        }

        return h.response(constructAuthUserResponse(user)).code(200)
      } catch (err) {
        return Boom.badImplementation('Something went wrong! :(', err)
      }
    },
    /**
     * POST /user
     * @param {*} request
     * @param {*} h
     */
    async createUser (request, h) {
      const payload = request.payload

      try {
        const user = await server.methods.services.users.create(payload)
        return h.response(constructAuthUserResponse(user)).code(201)
      } catch (err) {
        return h.response(replyHelper.constructErrorResponse(err, 409)).code(409)
      }
    },
    /**
     * GET /user
     * @param {*} request
     * @param {*} h
     */
    async getCurrentUser (request, h) {
      try {
        if (!request.auth.credentials) {
          Boom.notFound('User not found')
        }
        const user = request.auth.credentials.user
        const response = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
        }
        return h.response(response)
      } catch (err) {
        return h.response(err).code(422)
      }
    },
    /**
     * PUT /user
     * @param {*} request
     * @param {*} h
     */
    async updateUser (request, h) {
      try {
        const payload = request.payload
        const authStatus = request.auth.credentials
        if (authStatus) {
          const status = await server.methods.services.users.updateUser(authStatus.user, payload)
          if (status) {
            return h.response({ message: 'Success!' }).code(201)
          } else {
            return Boom.badRequest('Unable to perform updation. Please try again later.')
          }
        }
      } catch (err) {
        return h.response(constructAuthUserResponse(err)).code(422)
      }
    },
    /**
     * DELETE /user
     * @param {*} request
     * @param {*} h
     */
    async deleteUser (request, h) {
      try {
        const authStatus = request.auth.credentials
        if (authStatus) {
          const status = await server.methods.services.users.deleteUser(authStatus.user)
          if (status) {
            return h.response({ message: 'Success!' }).code(201)
          } else {
            return Boom.badRequest('Unable to perform deletion. Please try again later.')
          }
        }
      } catch (err) {
        return h.response(constructAuthUserResponse(err)).code(422)
      }
    }
  }
}
