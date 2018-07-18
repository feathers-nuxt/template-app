# {disallow} = (require 'feathers-hooks-common')

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
    all: []
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []