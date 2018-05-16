logger = require './hooks/logger'

module.exports =
  before: 
    all: [logger!]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []
  after: 
    all: [logger!]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: [] 
  error: 
    all: [logger!]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []