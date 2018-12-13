feathers = require '@feathersjs/feathers'
express = require '@feathersjs/express'

winston = require './utils/winston'  

{json, urlencoded, rest, errorHandler} = express

module.exports = api = express feathers! # Create feathers instance and make it compatible with express v4+ <% if(resque) { %>
api.configure require './jobs' # set up persistent background jobs <% } %>

api.configure (require '@feathersjs/configuration')! # Load configuration parameters into app instance
api.configure (require 'feathers-hooks-validator')! # Validate request bodies against service schema
api.configure (require 'feathers-logger') winston # Add .info .error .warn etc for invoking winston
api.configure require './db/orm' # set up database connection and ORM using <% if(database == 'sql'){%>sequelize<%}else{%>mongoose<%}%>

api.use (require 'cors')! # Enable Cross-origin resource sharing
api.use (require 'helmet')! # Add HTTP response headers for security
api.use json limit: '10mb' # Parse every request body with JSON payload
api.use urlencoded limit: '10mb' extended: true # Parse request bodies with urlencoded payload

api.configure rest! # Register transport to avail services via REST
api.configure require './services' # Register feathers services
api.configure require './channels' # Register channels 

api.use errorHandler logger: winston # Catch and log all errors 

api.hooks require './hooks' # Register global application hooks
