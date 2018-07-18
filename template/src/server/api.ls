path = require 'path'

configuration = require '@feathersjs/configuration'
feathers = require '@feathersjs/feathers'
socketio = require '@feathersjs/socketio'
express = require '@feathersjs/express'
logger = require 'feathers-logger'
validator = require 'feathers-hooks-validator'
{ profiler }  = require 'feathers-profiler'

cors = require 'cors'
helmet = require 'helmet'
compress = require 'compression'

{consoleListener, wsServerListener} = require './utils/storyboard'
winston = require './utils/winston'
global = require './hooks/global'
auth = require './services/auth'

services = require './services'
channels = require './channels'
jobs = require './jobs'


<% if(database == 'sql') { %>
orm = require './db/orm'
<% } %>

api = express feathers!

# End to End logging to file and console ( DEV env only )
api.configure logger winston # feathers logger mixin using winston console,file transport
api.configure consoleListener # storyboard console listenter. dev only?
api.configure socketio wsServerListener api #storyboard websocket listener

api.use cors!
api.use helmet!
api.use compress!
api.use express.json limit: '10mb'
api.use express.urlencoded limit: '10mb' extended: true

api.configure configuration!
api.configure express.rest!
api.configure validator!

<% if(database == 'sql') { %>
api.configure orm
<% } %>

api.configure services
# api.configure jobs

api.configure channels # Set up event channels (see channels.ls)

# profiler must be configured after all services
api.configure profiler stats: 'detail', logger: log: (payload) -> api.storyboard.profiler.trace 'profiler' payload

api.use express.notFound!
api.use express.errorHandler logger: winston

api.hooks global

module.exports = api