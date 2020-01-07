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

const errorHandler = (request, h, error) => {
  console.log(error)
  return h.response('sdcd')
}

const HeadersPayLoad = Joi.object().keys({
  Authorization: Joi.string().required().description('A valid Json Web Token')
}).unknown().rename('authorization', 'Authorization')

const GetCurrentPayload = {
  headers: HeadersPayLoad,
  failAction: errorHandler
}

module.exports = {
  loginPayload,
  registerPayload,
  GetCurrentPayload
}
