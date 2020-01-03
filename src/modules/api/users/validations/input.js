const Joi = require('@hapi/joi')

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------

const LoginPayload = {
  payload: Joi.object().keys({
    user: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  })
}

const RegisterPayload = {
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
  LoginPayload,
  RegisterPayload
}
