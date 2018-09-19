_ =  require('feathers-hooks-common')
authentication = require '@feathersjs/authentication'

logger = require './logger'

openProfilerStory = (context) ->
  {app, path, method, params, service} = context
  clientStories = if params.query and params.query.storyId then Array.of params.query.storyId else void
  story = src: 'server' title: "#{method} /#{path}" level: 'DEBUG' extraParents: clientStories
  app.storyboard[path] = app.storyboard.mainStory.child story
  app.storyboard.path = path
  # console.log '@@@@@@@@@@@@@@@@openProfilerStory', params.query
  delete params.query.storyId if params.query and params.query.storyId
  context

closeProfilerStory = (context) ->
  {app, path} = context
  app.storyboard[path].close!
  context

setParamsForRestProxy = (context) ->>
  {app, params} = context
  {query, user} = params
  console.log '@@@@@@@@@@@@@@@@setParamsForRestProxy'
  # if user and user.id and not params.token
  #   login = await app.services.logins.get user.id
  #   params.token = login.token
  if query
    if query.$limit 
      query.limit = query.$limit 
      delete query.$limit 
    if query.$skip 
      query.skip = query.$skip 
      delete query.$skip 
  context

authenticationIsNecessary = (hook) -> 
  authPath = hook.app.get('authentication').path
  authManagementPath = 'authManagement'
  hook.params.provider and hook.path isnt authPath and hook.path isnt authManagementPath 

module.exports =
  before: 
    all: [
      # logger!
      openProfilerStory
      _.when authenticationIsNecessary, authentication.hooks.authenticate [ 'jwt' ]
      # setParamsForRestProxy
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
    ]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []
  finally: 
    all: [
      # logger!
      closeProfilerStory
    ]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []