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
  logger.info 'nuxt:build:done' 
  if err
    logger.error err
    process.exit 1
  api.ready.then (api) ->
    server = app.listen (api.get 'port'), (er) ->
      throw er if er
      api.setup server
      api.info "app listening on http://#{api.get 'host'}:#{api.get 'port'}"