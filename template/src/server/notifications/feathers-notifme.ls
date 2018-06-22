Debug = require 'debug'
Proto = require 'uberproto'
NotifmeSdk = (require 'notifme-sdk').default

debug = Debug('feathers-notifme')

class Service 
  (options) ->
    debug 'Service constructor', options
    @notifier = new NotifmeSdk(options)
  extend: (obj) -> Proto.extend obj, @
  create: (body, params, cb) ->
    debug 'Service create', body, params
    return @notifier.send body

function init (options)
  new Service options

init.Service = Service

module.exports = init