module.exports = (server) => {
  return {
    /**
     * POST /users/login
     * @param {*} request
     * @param {*} h
     */
    async loginUser (request, h) {
      // const payload = request.payload

      // server.methods.services.users.getByEmail(payload.user.email).then((user) => {
      //   if (!user) {
      //     return h.response({
      //       errors: {
      //         404: ['email/password is invalid !']
      //       }
      //     }).code(404)
      //   }

      //   if (!user.validPassword(payload.user.password)) {
      //     return reply({
      //       errors: {
      //         'email or password': ['email or password missmatch !']
      //       }
      //     }).code(401)
      //   }

      //   return h.response(user)
      // }).catch((err)=>{return h.response(err).code(422)})
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
        return h.response(user).code(201)
      } catch (err) {
        console.log(err)
        return h.response(err).code(400)
      }
    }
  }
}
