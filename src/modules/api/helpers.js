// --------------------------------------------------
//    Helpers
// --------------------------------------------------

const responseType = {
  200: 'Success',
  201: 'Created',
  400: 'Bad Request',
  304: 'Not Modified',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity (WebDAV)',
  500: 'Internet Server Error'
}

function joiResponseErrorHandler (err) {
  if (err.isJoi) {
    console.log('#### IS JOI #######')
    const response = {
      errors: [],
      statusCode: err.output.statusCode
    }

    console.log(err)

    err.details.forEach((error) => {
      response.errors.push(
        {
          message: error.message
        }
      )
    })

    return response
  }

  return null
}

function defaultResponseErrorHandler (err) {
  const response = {
    errors: []
  }

  response.errors.push(
    {
      name: err.name,
      message: err.message
    }
  )

  return response
}

function sequelizeResponseValidationErrorHandler (err) {
  if (err.sql) {
    const response = {
      errors: []
    }

    err.errors.forEach((error) => {
      response.errors.push(
        {
          type: error.type,
          message: error.message
        }
      )
    })

    return response
  }

  return null
}

const errorHandlers = [joiResponseErrorHandler, sequelizeResponseValidationErrorHandler, defaultResponseErrorHandler]

const constructErrorResponse = (err) => {
  let response
  for (const handler in errorHandlers) {
    const handlerFn = errorHandlers[handler]
    response = handlerFn(err)
    if (response !== null) break
  }
  return response
}

module.exports = {
  constructErrorResponse,
  responseType
}
