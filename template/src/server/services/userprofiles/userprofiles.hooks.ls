# {disallow} = (require 'feathers-hooks-common')

logError = (context) ->
  {app} = context
  console.log 'logError logError logError' 
  context

module.exports =
  before: 
    # all: [disallow 'external']
    all: []
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []
  after:
    all: []
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []
  error:
    all: [
      logError
    ]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []