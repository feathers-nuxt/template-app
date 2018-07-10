path = require 'path'
logger = require './utils/winston'

# https://github.com/guigrpa/storyboard#log-filtering
process.env['STORYBOARD'] = "*:*"

# https://docs.feathersjs.com/api/configuration.html
process.env['NODE_CONFIG_DIR'] = path.join __dirname, 'config/'

app = require './app' #express server with nuxt middleware serves and renders ui app
api = require './api' #feathersjs server serves data from db, fs enforcing access control

process.on 'unhandledRejection', (reason, p) ->
  logger.error 'Unhandled Rejection at: Promise ', p, reason

process.on 'nuxt:build:done', (err) ->
  api.info 'nuxt:build:done'
  logger.error err if err
  # See https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback
  server = app.listen (api.get 'port'), (err) ->
    throw err if err
    api.setup server
    api.info "app listening on http://#{api.get 'host'}:#{api.get 'port'}"