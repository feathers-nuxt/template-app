_ =  require 'feathers-hooks-common'
errors = require '@feathersjs/errors'
jwt = require '@feathersjs/authentication-jwt'
local = require '@feathersjs/authentication-local'
authentication = require '@feathersjs/authentication'
authManagement = require 'feathers-authentication-management'

authorize = require '../../hooks/abilities'

dispatcher = require '../../notifications/dispatcher'

authManagementOptions =
  service: 'users'
  path: 'authManagement'
  notifier: dispatcher
  longTokenLen: 15
  shortTokenLen: 6
  shortTokenDigits: true
  # delay:
  # resetDelay:
  # identifyUserProps:

# the string username is replaced with name of logged in user
# https://github.com/feathersjs/authentication/issues/508
# work around: manually set this configuration
local_auth_config =
  # entity: 'data'
  service: 'users'
  usernameField: 'username'
  passwordField: 'password'
  
isAction = (args) -> (hook) -> Array.of(args).includes hook.data.action

updatePassword = (context) ->>
  {app, data, result} = context
  res = await app.services.users.patch result.id, password: data.password
  console.log '####### updatePassword' data, result, res
  context

attachUserToResponse = (context) ->
  {app, params, result} = context
  result.id = params.user.id
  result.user = params.user
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

module.exports = ->
  app = @
  config = app.get 'authentication'
  app.configure authentication config
  app.configure jwt!
  app.configure local local_auth_config
  app.configure authManagement authManagementOptions
  (app.service 'authentication').hooks {
    before:
      create: [ authentication.hooks.authenticate config.strategies ]
      remove: [ authentication.hooks.authenticate config.strategies ]
    after:
      # create: [ logAuthenticationDone, authorize! ]
      create: [ attachUserToResponse, logAuthenticationDone ]
      remove: [ ]
    error:
      all: [ logAuthenticationError ]
  }
  (app.service 'authManagement' ).hooks {
    after:
      create: [
        _.iff(isAction('verifySignupLong'), updatePassword),
      ]
  }
