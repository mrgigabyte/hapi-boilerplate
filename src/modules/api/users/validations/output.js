const Joi = require('@hapi/joi')
const _ = require('lodash')
const {
  BadRequestStatus,
  UnauthorizedStatus,
  ForbiddenStatus,
  NotFoundStatus,
  ConflictStatus,
  // UnprocessableEntityStatus,
  InternalServerErrorStatus
} = require('../../validations')

const UserInfoResponse = Joi.object().keys({
  user: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    token: Joi.string().required()
  })
})

const GetUserInfoResponse = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required()
})

const PutUserInfoResponse = Joi.object().keys({
  message: Joi.string().valid('Success!')
})

const OnRegisterOutputValidationConfig = _.merge({}, InternalServerErrorStatus, BadRequestStatus, ConflictStatus, { status: { 201: UserInfoResponse } })
const OnLoginOutputValidationConfig = _.merge({}, InternalServerErrorStatus, UnauthorizedStatus, BadRequestStatus, NotFoundStatus, { status: { 200: UserInfoResponse } })
const AuthOnGetUserInfoValidationConfig = _.merge({}, InternalServerErrorStatus, UnauthorizedStatus, NotFoundStatus, { status: { 200: GetUserInfoResponse } })
const AuthOnPutUserInfoValidationConfig = _.merge({}, InternalServerErrorStatus, UnauthorizedStatus, NotFoundStatus, ForbiddenStatus, { status: { 201: PutUserInfoResponse } })

module.exports = {
  OnRegisterOutputValidationConfig,
  OnLoginOutputValidationConfig,
  AuthOnGetUserInfoValidationConfig,
  AuthOnPutUserInfoValidationConfig
}
