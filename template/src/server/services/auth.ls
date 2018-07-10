memory = require 'feathers-memory'
errors = require '@feathersjs/errors'
jwt = require '@feathersjs/authentication-jwt'
local = require '@feathersjs/authentication-local'
authentication = require '@feathersjs/authentication'

authorize = require '../hooks/abilities'

attachUserToResponse = (context) ->
  {app, params, result} = context
  console.log '####### attachUserToResponse'
  result.id = params.user.id
  result.user = params.user
  result.user.profile = params.user.user
  result.user.login =
    id: params.user.id
    token: params.user.token
    issuedAt: params.user.issuedAt
    expireAt: params.user.expireAt
  delete! result.user.user
  delete! result.user._id
  delete! result.user.issuedAt
  delete! result.user.expireAt
  context

logAuthenticationDone = (context) ->
  {app, params, result} = context
  app.storyboard.profiler.trace 'auth' 'authentication successful'
  # console.log '####### attachUserToResponse' result
  context

logAuthenticationError = (context) ->
  {app} = context
  context.app.storyboard.mainStory.error 'auth:error:hook' 'authentication error'
  console.log 'logAuthenticationError logAuthenticationError logAuthenticationError' , context.error
  context

removeCached = (context) ->>
  {app, params, result, id} = context
  config = app.get 'authentication'
  payload = await app.passport.verifyJWT id, config
  console.log '#######' params
  # try
  #   login = await context.app.services.logins.remove payload.id
  #   console.log '#######' id, payload.id, login
  # catch
  #   console.log 'removeCached auth hook failed' e

# the string username is replaced with name of logged in user
# https://github.com/feathersjs/authentication/issues/508
# work around: manually set this configuration
local_auth_config = 
  # entity: 'data'
  service: 'proxyusers'
  usernameField: 'username'
  passwordField: 'password'

jwt_auth_config = 
  entity: 'user'
  service: 'proxyusers'
  usernameField: 'username'

rest = require('../jobs/strategy')
{LocalVerifier, JWTVerifier} = require('../jobs/verifier')

rest_auth_config =
  # which header to look at
  header: 'x-api-key',
  # which keys are allowed
  allowedKeys: ['opensesame']

module.exports = ->
  app = @
  config = app.get 'authentication'
  app.configure authentication config
  # app.configure jwt!
  app.configure jwt Verifier: JWTVerifier
  # app.configure local local_auth_config
  # app.configure local Verifier: LocalVerifier
  # app.configure local config.local
  app.configure rest rest_auth_config
  (app.service 'authentication').hooks {
    before:
      create: [ authentication.hooks.authenticate config.strategies ]
      remove: [ authentication.hooks.authenticate config.strategies ]
    after:
      # create: [ logAuthenticationDone, authorize! ]
      create: [ attachUserToResponse, logAuthenticationDone ]
      remove: [ removeCached ]
    error:
      all: [ logAuthenticationError ]
  }