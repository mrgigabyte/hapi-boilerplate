const Joi = require('@hapi/joi')
const options = require('../package.json').options.response
const { responseOptions } = require('../../validations')

console.log(options)

const registerPayload = {
  sample: options.sample,
  status: {
    201: Joi.object().keys({
      user: Joi.object().keys({

        email: Joi.string().email().required(),
        token: Joi.string().required()
      })
    }),
    422: Joi.object().keys({
      user: Joi.object().keys({

        email: Joi.string().email().required(),
        token: Joi.string().required()
      })
    })
  },
  options: responseOptions.options,
  failAction: responseOptions.failAction
}

module.exports = {
  registerPayload
}
