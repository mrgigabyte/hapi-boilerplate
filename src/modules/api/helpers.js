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
  console.log('**********************************joi*****************************')
  if (err.isJoi) {
    console.log('%%%%%%%%%%%%%%%%', err)
    const response = {
      errors: [],
      statusCode: err.output.statusCode
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
  console.log('**********************************default*****************************')
  console.log('###################', err)
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
  console.log('**********************************sql*****************************')
  if (err.sql) {
    const response = {
      errors: []
    }

    err.errors.forEach((error) => {
      response.errors.push(
        {
          message: error.message
        }
      )
    })

    console.log(response)

    return response
  }

  return null
}

const errorHandlers = [joiResponseErrorHandler, sequelizeResponseValidationErrorHandler, defaultResponseErrorHandler]

const constructErrorResponse = (err) => {
  let response
  console.log('****************', err)
  for (const handler in errorHandlers) {
    console.log(handler)
    const handlerFn = errorHandlers[handler]
    response = handlerFn(err)
    if (response !== null) {
      console.log(response)
      console.log('!@#$%^&*(*&^%$$%^&*(')
      break
    }
  }
  return response
}

module.exports = {
  constructErrorResponse,
  responseType
}
