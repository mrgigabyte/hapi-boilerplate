const Joi = require('@hapi/joi')
const _ = require('lodash')
const {
  BadRequestStatus,
  UnauthorizedStatus,
  // ForbiddenStatus,
  NotFoundStatus,
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

const UserInfoPayload = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  roles: Joi.any(),
  createdAt: Joi.any().required(),
  updatedAt: Joi.any().required()
})

const OnRegisterOutputValidationConfig = _.merge({}, InternalServerErrorStatus, BadRequestStatus, ConflictStatus, { status: { 201: registerPayload } })
const OnLoginOutputValidationConfig = _.merge({}, InternalServerErrorStatus, BadRequestStatus, NotFoundStatus, { status: { 200: registerPayload } })
const AuthOnGetUserInfoValidationConfig = _.merge({}, InternalServerErrorStatus, UnauthorizedStatus, NotFoundStatus, { status: { 200: UserInfoPayload } })

module.exports = {
  OnRegisterOutputValidationConfig,
  OnLoginOutputValidationConfig,
  AuthOnGetUserInfoValidationConfig
}
