module.exports = (server) => {
  return {
    // /**
    //  * POST /users/login
    //  * @param {*} request
    //  * @param {*} h
    //  */
    // loginUser (request, h) {
    //   const payload = request.payload

    //   server.methods.services.users.getByEmail(payload.user.email).then((user) => {
    //     if (!user) {
    //       return h.response({
    //         errors: {
    //           404: ['email/password is invalid !']
    //         }
    //       }).code(404)
    //     }

    //     if (!user.validPassword(payload.user.password)) {
    //       return reply({
    //         errors: {
    //           'email or password': ['email or password missmatch !']
    //         }
    //       }).code(401)
    //     }

    //     return h.response(user)
    //   }).catch((err)=>{return h.response(err).code(422)})
    // },
    /**
         * POST /users
         * @param {*} request
         * @param {*} h
         */
    createUser (request, h) {
      const payload = request.payload

      server.methods.services.users.create(payload)

      return 'ooooooooof'
      // .then((user) => {
      //   return h.response(user)
      // }).catch(err => {
      //   console.log(err)
      //   return h.response(err)
      // })
      //   const payload = request.payload

      //   User.create(payload).then((err, user) => {
      //   // TODO: Better error response
      //     if (err) return h.response(err).code(422)
      //     if (!user) return h.response().code(422)

      //     return h.response(user)
      //   })
    }
  }
}
