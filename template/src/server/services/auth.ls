memory = require 'feathers-memory'
errors = require '@feathersjs/errors'
jwt = require '@feathersjs/authentication-jwt'
local = require '@feathersjs/authentication-local'
authentication = require '@feathersjs/authentication'

authorize = require '../hooks/abilities'

logAuthenticationDone = (context) ->
  # return Promise.reject new errors.Forbidden 'Credentials incorrect' if not _.get context, 'params.user'
  context.result.useraccount = context.params.useraccount
  delete! context.result.useraccount.password
  context.app.storyboard.mainStory.info 'auth:after:hook' 'authentication successful'
  context

logAuthenticationError = (context) ->
  {app} = context
  config = app.get 'authentication'
  context.app.storyboard.mainStory.error 'auth:error:hook' 'authentication error'
  console.log 'logAuthenticationError logAuthenticationError logAuthenticationError' , context.data
  context

# the string username is replaced with name of logged in user
# https://github.com/feathersjs/authentication/issues/508
# work around: manually set this configuration
local_auth_config = 
  entity: 'useraccount'
  service: 'useraccounts'
  usernameField: 'username'
  passwordField: 'password'

module.exports = ->
  app = @
  config = app.get 'authentication'
  app.configure authentication config
  app.configure jwt!
  app.configure local local_auth_config
  # app.configure local config.local
  (app.service 'authentication').hooks {
    before:
      create: [authentication.hooks.authenticate config.strategies]
      remove: [authentication.hooks.authenticate 'jwt']
    after:
      create: [ logAuthenticationDone, authorize! ]
    error:
      all: [ logAuthenticationError ]
  }