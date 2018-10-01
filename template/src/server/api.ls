path = require 'path'

configuration = require '@feathersjs/configuration'
feathers = require '@feathersjs/feathers'
socketio = require '@feathersjs/socketio'
express = require '@feathersjs/express'

validator = require 'feathers-hooks-validator'
{profiler}  = require 'feathers-profiler'
swagger = require 'feathers-swagger'
logger = require 'feathers-logger'

compress = require 'compression'
helmet = require 'helmet'
cors = require 'cors'

storyboard = require './utils/storyboard'
chain = require './utils/async-chain'
winston = require './utils/winston'

global = require './hooks/global'
services = require './services'
channels = require './channels'

<% if(resque) { %>jobs = require './jobs'<% } %>
<% if(database == 'sql') { %>orm = require './db/orm'<% } %>

api = chain!

# need to bypass the chain here
# config = configuration().bind(global)() 

/* End to End logging to file and console ( DEV env only ) */
{consoleListener, wsServerListener} = storyboard
api.configure logger winston # feathers logger mixin using winston
api.configure consoleListener # storyboard console listener. dev only?
api.configure socketio wsServerListener api #storyboard websocket listener

api.use cors!
api.use helmet!
api.use compress!
api.use express.json limit: '10mb' # accept JSON payloads
api.use express.urlencoded limit: '10mb' extended: true # accept multipart form payloads

api.configure configuration!
api.configure express.rest!
api.configure validator!

<% if(database == 'sql') { %>api.configure orm # set up sequelize db connection <% } %>
<% if(resque) { %>api.configure jobs # set up persistent background jobs <% } %>

api.configure swagger docsPath: '/docs', basePath: '/api', uiIndex: path.resolve __dirname, '../client/static/docs.html'

api.configure services # see services directory
api.configure channels # see channels.ls

# profiler must be configured after all services
api.configure profiler stats: 'detail', logger: log: (payload) -> mainStory.trace 'profiler' payload

api.use express.notFound!
api.use express.errorHandler logger: winston

api.hooks global

ready = api.chain express feathers!

module.exports = new Proxy api, {
	get: (target, name) -> if name is 'ready' then ready else target[name]
}