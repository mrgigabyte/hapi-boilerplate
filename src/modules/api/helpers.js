// --------------------------------------------------
//    Helpers
// --------------------------------------------------

const responseType = {
  200: 'Success',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity (WebDAV)',
  500: 'Internal Server Error'
}

function errorResponseSchema (statusCode) {
  return {
    error: {
      code: statusCode,
      type: responseType[statusCode],
      details: []
    }
  }
}

function joiResponseErrorHandler (err, statusCode) {
  if (err.isJoi) {
    const response = errorResponseSchema(statusCode)

    err.details.forEach((error) => {
      response.error.details.push(
        {
          message: error.message
        }
      )
    })

    return response
  }

  return null
}

function defaultResponseErrorHandler (err, statusCode) {
  const response = errorResponseSchema(statusCode)

  response.error.details.push(
    {
      message: err
    }
  )

  return response
}

function sequelizeResponseValidationErrorHandler (err, statusCode) {
  if (err.sql) {
    const response = errorResponseSchema(statusCode)

    err.errors.forEach((error) => {
      response.error.details.push(
        {
          message: error.message
        }
      )
    })

    return response
  }

  return null
}

const errorHandlers = [joiResponseErrorHandler, sequelizeResponseValidationErrorHandler, defaultResponseErrorHandler]

const constructErrorResponse = (err, statusCode) => {
  if (!statusCode) {
    if (err.isBoom) {
      console.log(err)
      const reformated = {
        error: {
          code: err.output.payload.statusCode,
          type: err.output.payload.error,
          details: [{
            message: err.output.payload.message
          }]
        }
      }
      err.reformat()
      err.output.payload = reformated
      return err
    }
  }

  let response
  for (const handler in errorHandlers) {
    const handlerFn = errorHandlers[handler]
    response = handlerFn(err, statusCode)
    if (response !== null) {
      break
    }
  }
  return response
}

module.exports = {
  constructErrorResponse,
  responseType,
  errorResponseSchema
}
