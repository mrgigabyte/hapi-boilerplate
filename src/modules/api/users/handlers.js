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
          throw replyHelper.constructErrorResponse(Boom.notFound('no account associated with given email id'))
        }

        if (!user.validPassword(payload.user.password)) {
          return replyHelper.constructErrorResponse(Boom.unauthorized('email or password missmatch!'))
        }

        return h.response(constructAuthUserResponse(user)).code(200)
      } catch (err) {
        return replyHelper.constructErrorResponse(Boom.badImplementation('Something went wrong! :(',err))
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
        return h.response(request.auth.credentials.user)
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
            return Boom.badRequest('Unable perform updation')
          }
        }
      } catch (err) {
        return h.response(constructAuthUserResponse(err)).code(422)
      }
    }
  }
}
