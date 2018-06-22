_ =  require('feathers-hooks-common')
authentication = require '@feathersjs/authentication'

logger = require './logger'
authorize = require './abilities'

module.exports =
  before: 
    all: [
      # logger!
      _.when(
        (hook) -> hook.params.provider and hook.path isnt hook.app.get('authentication').path,
        authentication.hooks.authenticate <[ jwt local ]>
        # authorize!
      )
    ]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []
  after: 
    all: [
      # logger!
    ]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: [] 
  error: 
    all: [
      logger!
    ]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []