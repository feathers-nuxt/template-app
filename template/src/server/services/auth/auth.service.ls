errors = require '@feathersjs/errors'
jwt = require '@feathersjs/authentication-jwt'
local = require '@feathersjs/authentication-local'
authentication = require '@feathersjs/authentication'

authorize = require '../../hooks/abilities'

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

# the string username is replaced with name of logged in user
# https://github.com/feathersjs/authentication/issues/508
# work around: manually set this configuration
local_auth_config =
  # entity: 'data'
  service: 'users'
  usernameField: 'username'
  passwordField: 'password'

module.exports = ->
  app = @
  config = app.get 'authentication'
  app.configure authentication config
  app.configure jwt!
  app.configure local local_auth_config
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
