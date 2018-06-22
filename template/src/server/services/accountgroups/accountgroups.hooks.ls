{authenticate} = require('@feathersjs/authentication').hooks
# {disallow} = (require 'feathers-hooks-common')

hasPermission = require '../../hooks/has-permission'
ensureEnabled = require '../../hooks/ensure-enabled'

addStatusAttribute = (context) ->
  console.log 'Obect.keys context' Object.keys context

module.exports =
  before:
    all: [
      # disallow 'external'
      # authenticate 'jwt'
      # ensureEnabled!
      # hasPermission 'manageSettings'
    ]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []
  after:
    all: []
    find: [
      # addStatusAttribute
    ]
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