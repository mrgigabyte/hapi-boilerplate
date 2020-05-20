const config = require('../../config')

const register = async (server, options) => {
  const User = server.methods.models().user
  const validate = async function (decoded, request, h) {
    try {
      const user = await User.findOne({ where: { email: decoded.email } })
      if (!user) {
        return { isValid: false }
      }
      const isValid = (user.password === decoded.password)
      return { isValid, credentials: { user: user } }
    } catch (err) {
      return { isValid: false }
    }
  }

  const errorFunc = function (err, request, h) {
    // For writing custom error
    return err
  }

  server.auth.strategy('jwt', 'jwt', {
    key: config.auth.secret,
    validate: validate,
    errorFunc: errorFunc
  })
}

module.exports = {
  register,
  pkg: require('./package.json')
}
