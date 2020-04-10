const Joi = require('@hapi/joi')
const constructErrorResponse = require('./helpers').constructErrorResponse

const errorHandler = (request, h, error) => {
  const response = constructErrorResponse(error).errors
  const statusCode = constructErrorResponse(error).statusCode
  return h.response({ response }).code(statusCode).takeover()
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
