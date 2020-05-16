const { logger } = require('../../logger')
const Joi = require('@hapi/joi')
const constructErrorResponse = require('./helpers').constructErrorResponse
// const responseType = require('./helpers').responseType

const ValidateErrorHandler = (request, h, error) => {
  console.log('^^^^^^^^VALIDATE ERROR HANDLER^^^^^^^^^^^')
  const response = constructErrorResponse(error)
  console.log(response)
  const errors = response.errors
  const statusCode = response.statusCode
  return h.response({ errors }).code(statusCode).takeover()
}

const ResponseErrorHandler = (request, h, error) => {
  console.log('^^^^^^^^^^RESPONSE ERROR HANDLER^^^^^^^^^^')
  // console.log(error)
  // console.log('del',error.details)
  // console.log('##req##', request)
  // console.log('%%h%%', h)
  // console.log('$$error$$',error)

  // error.details[0].path.forEach(function (key) {
  //   console.log(key)
  //   responsex[key]=''
  //   response1[key] = response1[key]
  // })

  // console.log(response1)

  const message = {
    request: {
      info: request.info,
      auth: request.auth,
      headers: request.headers,
      method: request.method,
      path: request.path
    },
    response: {
      statusCode: h.response.statusCode,
      error: {
        details: error.details
      }
    }
  }
  logger.error(message, { occurence: 'ResponseErrorHandler' })
  const response = {
    errors: [
      {
        message: 'Something unexpected happened!'
      }
    ],
    statusCode: 500

  }

  const errors = response.errors
  const statusCode = response.statusCode

  return h.response({ errors }).code(statusCode).takeover()
}

// function schemaForStatusCode(statusCode){
//   return {
//     error: {
//       code: statusCode,

//     }
//   }
// }

const validateOptions = {
  options: { abortEarly: true },
  failAction: ValidateErrorHandler
}

const responseOptions = {
  options: { abortEarly: true },
  failAction: ResponseErrorHandler
}

// --------------------------------------------------
//    Schemas
// --------------------------------------------------

const HeadersPayLoad = Joi.object().keys({
  Authorization: Joi.string().required().description('A valid Json Web Token')
}).unknown().rename('authorization', 'Authorization')

module.exports = {
  validateOptions,
  responseOptions,
  ValidateErrorHandler,
  HeadersPayLoad
}
