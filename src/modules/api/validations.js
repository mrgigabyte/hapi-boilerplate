const { logger } = require('../../logger')
const constructErrorResponse = require('./helpers').constructErrorResponse
const options = require('./package.json').options.response
const Joi = require('@hapi/joi')
const responseType = require('./helpers').responseType
const errorSchema = require('./helpers').errorResponseSchema

// --------------------------------------------------
//    Error Handlers
// --------------------------------------------------

const ValidateErrorHandler = (request, h, error) => {
  const response = constructErrorResponse(error, error.output.statusCode)
  return h.response(response).code(response.error.code).takeover()
}

const ResponseErrorHandler = (request, h, error) => {
  if (request.response.isBoom) {
    return BoomResponseErrorHandler(request, h)
  }
  return ResponseErrorLogger(request, h, error)
}

const BoomResponseErrorHandler = (request, h) => {
  const response = request.response
  const reformated = {
    error: {
      code: response.output.payload.statusCode,
      type: response.output.payload.error
    }
  }
  const headers = response.output.headers
  if (headers['WWW-Authenticate']) {
    reformated.error.details = [{ message: headers['WWW-Authenticate'] }]
  } else {
    reformated.error.details = [{ message: response.output.payload.message }]
  }

  try {
    Joi.attempt(reformated, schemaForStatusCode(reformated.error.code))
    return h.response(reformated).code(reformated.error.code)
  } catch (err) {
    return ResponseErrorLogger(request, h, err)
  }
}

const ResponseErrorLogger = (request, h, error) => {
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

  const response = errorSchema(500)
  response.error.details.push({
    message: 'Something went wrong! :('
  })

  return h.response({ response }).code(response.error.code).takeover()
}

// --------------------------------------------------
//    Schema Options
// --------------------------------------------------

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

function schemaForStatusCode (statusCode) {
  return Joi.object().keys({
    error: Joi.object().keys({

      code: Joi.number().valid(statusCode).required(),
      type: Joi.string().valid(responseType[statusCode]).required(),
      details: Joi.array().items(Joi.object({
        message: Joi.string().required()
      }))

    })
  })
}

const HeadersPayLoad = Joi.object().keys({
  Authorization: Joi.string().required().description('A valid Json Web Token')
}).unknown().rename('authorization', 'Authorization')

const BadRequestStatus = {
  status: {
    400: schemaForStatusCode(400)
  }
}

const UnauthorizedStatus = {
  status: {
    401: schemaForStatusCode(401)
  }
}

const ForbiddenStatus = {
  status: {
    403: schemaForStatusCode(403)
  }
}

const NotFoundStatus = {
  status: {
    404: schemaForStatusCode(404)
  }
}

const ConflictStatus = {
  status: {
    409: schemaForStatusCode(409)
  }
}

const UnprocessableEntityStatus = {
  status: {
    422: schemaForStatusCode(422)
  }
}

const InternalServerErrorStatus = {
  sample: options.sample,
  status: {
    500: schemaForStatusCode(500)
  },
  options: responseOptions.options,
  failAction: responseOptions.failAction
}

module.exports = {

  validateOptions,
  responseOptions,
  HeadersPayLoad,
  BadRequestStatus,
  UnauthorizedStatus,
  ForbiddenStatus,
  NotFoundStatus,
  ConflictStatus,
  UnprocessableEntityStatus,
  InternalServerErrorStatus

}
