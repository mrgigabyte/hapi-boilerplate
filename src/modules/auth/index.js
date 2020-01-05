const config = require('../../config/config')


const register = async (server, options) => {
    const User = server.services.models().user
    const validate = async function (decoded, request, h) {

        try {

            const user = await User.findOne({ where: { email: decoded.email } })
            if (!user) {
                return { isValid: false }
            }
            const isValid = await user.validPassword(decoded.password)
            return { isValid, credentials: { user: user } }
        } catch (err) {
            return { isValid: false }
        }

    }

    server.auth.strategy('jwt', 'jwt', {
        key: config.auth.secret,
        validate: validate,
        tokenType: config.auth.tokenType,
        verifyOptions: config.auth.verifyOptions
    })
}


const plugin = {
    register,
    pkg: require('./package.json')
}

module.exports = plugin

