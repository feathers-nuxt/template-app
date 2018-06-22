path = require 'path'

configuration = require '@feathersjs/configuration'
feathers = require '@feathersjs/feathers'
socketio = require '@feathersjs/socketio'
express = require '@feathersjs/express'
logger = require 'feathers-logger'
validator = require 'feathers-hooks-validator'

cors = require 'cors'
helmet = require 'helmet'
compress = require 'compression'

storyboard = require './utils/storyboard'
winston = require './utils/winston'
global = require './hooks/global'
auth = require './services/auth'
orm = require './db/orm'

services = require './services'
channels = require './channels'
jobs = require './jobs'

{json, urlencoded, rest, notFound, errorHandler} = express

api = express feathers!

# setup express middleware
api.use cors!				# allow Cross-origin resource sharing
api.use helmet! 			# secure Express apps with various HTTP headers. 
api.use compress!			# compress response bodies for all request 
api.use json limit: '10mb' 	# parse incoming requests with JSON payloads using body-parser.
api.use urlencoded limit: '10mb' extended: true # parse incoming requests with urlencoded payloads using body-parser.

# setup feathers plugins
api.configure socketio storyboard api 	# Setup websocket transport plugin
api.configure logger winston 			# Logging mixin using winston logger under the hood
api.configure configuration! 			# Configure application using node-config and options in config directory
api.configure rest!	 					# Feathers Express framework bindings and REST transport plugin

# setup feathers hooks. 
api.configure validator!	# Hook utility for schema validation. Opt In per service
api.hooks global			# Application hooks that run on all services

# set up services and adapters
api.configure orm			# Database adapter for Sequelize ORM || Mongoose ORM
api.configure services		# the heart of your application. See  ./services directory
api.configure channels		# Event channels to send real-time events to connected clients 
api.configure jobs			# Distributed delayed background using node-resque. Requires redis

# setup feathers express error handling middleware.
api.use notFound verbose: true			# returns a NotFound (404) Feathers error.
api.use errorHandler logger: winston	# formats any error response to a REST call as JSON or HTML

module.exports = api