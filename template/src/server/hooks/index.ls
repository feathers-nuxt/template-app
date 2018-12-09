_ =  require('feathers-hooks-common')
authentication = require '@feathersjs/authentication'

PrettyError = require('pretty-error') 

logger = ->
  (hook) ->
    action = hook.type
    action = 'initiated' if hook.type is 'before' 
    action = 'completed' if hook.type is 'after' 
    action = 'cancelled' if hook.type is 'error' 
    message = "HOOK #{action} #{hook.method.to-upper-case!} #{hook.path}"
    console.log "\n" if hook.params.provider and hook.type is 'before' 
    if hook.type is 'error'
      hook.app.error message
      console.log (new PrettyError()).render(hook.error)
    else
      hook.app.info message
    # hook.app.debug 'hook.data', hook.data
    # hook.app.debug 'hook.params', hook.params
    # hook.app.debug 'hook.result', hook.result if hook.result
    hook

openProfilerStory = (context) ->
  {app, path, method, params, service} = context
  clientStories = if params.query and params.query.storyId then Array.of params.query.storyId else void
  story = src: 'server' title: "#{method} /#{path}" level: 'DEBUG' extraParents: clientStories
  app.storyboard[path] = app.storyboard.profiler = app.storyboard.mainStory.child story
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

authenticationRequired = (hook) -> 
  whitelist = Array.of hook.app.get('authentication').path, 'proxyauth', 'alerts'
  #hook.params.provider and hook.path isnt hook.app.get('authentication').path and hook.path isnt 'proxyauth' and hook.path isnt 'proxyauth'
  hook.params.provider and not whitelist.includes hook.path

module.exports =
  before: 
    all: [
      logger!
    #   openProfilerStory
      _.when(
        authenticationRequired,
        authentication.hooks.authenticate [ 'jwt' ]
      )
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
    #   closeProfilerStory
      logger!
    ]
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []