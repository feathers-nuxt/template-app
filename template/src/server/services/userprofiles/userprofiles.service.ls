Debug = require 'debug'
Proto = require 'uberproto'

debug = (require 'debug') 'userprofiles-service'

hooks = require './userprofiles.hooks'

debug = Debug('feathers-notifme')

class Service 
  (options) ->
    debug 'userprofiles Service constructor', options
  setup: (@app) ->
  extend: (obj) -> Proto.extend obj, @
  create: (body, params, cb) ->>
    debug 'Service create', body, params
    try
      user = await @app.services.users.create body
      useraccount = await @app.services.useraccounts.create {
        username: body.surname
        password: body.phone
        userId: user.id
        statusId: 1
      }
      Promise.resolve Object.assign {}, user, username: useraccount.username
    catch
      Promise.reject e

function createService (options)
  new Service options

createService.Service = Service

module.exports = ->
  app = @
  options = {}
  app.use '/userprofiles', createService options
  service = app.service 'userprofiles'
  service.hooks hooks
  service.validator [
      methods: ['create','update']
      rules:
        surname: 'required|string|max:15'
        otherNames: 'required|string|max:60'
        phone: 'required|string|max:15'
        email: 'required|email'
      messages:
        'surname.required': 'Surname is required.'
        'otherNames.required': 'Other names are required.'
        'phone.required': 'Phone number is required.'
        'email.required': 'A valid email address is required.'
  ]
  return
