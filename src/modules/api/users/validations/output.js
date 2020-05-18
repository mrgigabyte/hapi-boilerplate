const Joi = require('@hapi/joi')
const _ = require('lodash')
const {
  // responseOptions,
  BadRequestStatus,
  // UnauthorizedStatus,
  // ForbiddenStatus,
  // NotFoundStatus,
  ConflictStatus,
  // UnprocessableEntityStatus,
  InternalServerErrorStatus
} = require('../../validations')

const registerPayload = Joi.object().keys({
  user: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    token: Joi.string().required()
  })
})

const AuthOnRegisterOutputValidationConfig = _.merge({}, InternalServerErrorStatus, BadRequestStatus, ConflictStatus, { status: { 201: registerPayload } })

module.exports = {
  AuthOnRegisterOutputValidationConfig
}
