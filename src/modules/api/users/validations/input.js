const Joi = require('@hapi/joi')
const { validateOptions, HeadersPayLoad } = require('../../validations')
// const HeadersPayLoad = Joi.object().keys({
//   Authorization: Joi.string().required().description('A valid Json Web Token')
// }).unknown().rename('authorization', 'Authorization')

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------

const loginPayload = {
  payload: Joi.object().keys({
    user: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const registerPayload = {
  payload: Joi.object().keys({
    user: Joi.object().keys({
      name: Joi.required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const updatePayload = {
  headers: HeadersPayLoad,
  payload: Joi.object().keys({
    user: Joi.object().keys({
      name: Joi.string(),
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
    })
  }),
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const getCurrentPayload = {
  headers: HeadersPayLoad,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

module.exports = {
  loginPayload,
  registerPayload,
  getCurrentPayload,
  updatePayload
}
