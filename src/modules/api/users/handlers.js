module.exports = (server) => {
  function constructAuthUserResponse (user) {
    const authUser = { user: user.toAuthJSON() }
    return authUser
  }

  return {
    /**
     * POST /users/login
     * @param {*} request
     * @param {*} h
     */
    async loginUser (request, h) {
      const payload = request.payload
      try {
        const user = await server.methods.services.users.getByEmail(payload.user.email)

        if (!user) {
          return h.response({
            errors: {
              404: ['no account associated with given email id']
            }
          }).code(404)
        }

        if (!user.validPassword(payload.user.password)) {
          return h.response({
            errors: {
              'email or password': ['email or password missmatch !']
            }
          }).code(401)
        }

        return h.response(constructAuthUserResponse(user)).code(200)
      } catch (err) {
        console.log(err)
        return h.response(err).code(422)
      }
    },
    /**
     * POST /users
     * @param {*} request
     * @param {*} h
     */
    async createUser (request, h) {
      const payload = request.payload

      try {
        const user = await server.methods.services.users.create(payload)
        return h.response(constructAuthUserResponse(user)).code(201)
      } catch (err) {
        return h.response(err).code(400)
      }
    },
    async getCurrentUser (request, h) {
      try {
        return h.response(request.auth.credentials.user)
      } catch (err) {
        console.log(err)
        return h.response(err).code(422)
      }
    }
  }
}
