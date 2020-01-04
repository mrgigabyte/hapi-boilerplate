const Joi = require('@hapi/joi')

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------

const loginPayload = {
  payload: Joi.object().keys({
    user: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  })
}

const registerPayload = {
  payload: Joi.object().keys({
    user: Joi.object().keys({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  })
}

module.exports = {
  loginPayload,
  registerPayload
}
