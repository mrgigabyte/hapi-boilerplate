const Joi = require('@hapi/joi')
// const Boom = require('@hapi/boom')
const constructErrorResponse = require('./helpers').constructErrorResponse

const errorHandler = (request, h, error) => {
  return h.response(constructErrorResponse(error)).code(422).takeover()
}

const validateOptions = {
  options: { abortEarly: false },
  failAction: errorHandler
}

// --------------------------------------------------
//    Schemas
// --------------------------------------------------

const HeadersPayLoad = Joi.object().keys({
  Authorization: Joi.string().required().description('A valid Json Web Token')
}).unknown().rename('authorization', 'Authorization')

module.exports = {
  validateOptions,
  errorHandler,
  HeadersPayLoad
}
