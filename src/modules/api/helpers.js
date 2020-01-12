// --------------------------------------------------
//    Helpers
// --------------------------------------------------

const responseType = {
  200: 'success',
  201: 'created',
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
  console.log(err.isBoom)
  if (err.isJoi) {
    const response = {
      errors: []
    }

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
  console.log('postgres error')
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
    if (typeof (handlerFn) === 'function') {
      response = handlerFn(err)
      if (response !== null) break
    }
  }
  return response
}

module.exports = {
  constructErrorResponse,
  responseType
}
