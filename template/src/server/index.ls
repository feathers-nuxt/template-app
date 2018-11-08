path = require 'path'

process.env['STORYBOARD'] = "*:*" # https://github.com/guigrpa/storyboard#log-filtering
process.env['NODE_CONFIG_DIR'] = path.join __dirname, 'config/' # https://docs.feathersjs.com/api/configuration.html

logger = require './utils/winston'
express = require './app' #express server with nuxt middleware serves and renders ui app
feathers = require './api' #feathers server abstracts data from db, fs enforcing access control

process.on 'unhandledRejection', (reason, p) ->
  console.log 'Unhandled Rejection at: Promise ', p, reason

process.on 'nuxt:build:done', (err) ->>
  logger.info 'nuxt:build:done' 
  if err
    console.log e
    process.exit 1
  try
    api = await feathers.ready
    host = api.get 'host'
    port = api.get 'port'
    ui = await express.listen port
    api.setup ui
    api.info "app listening on http://#{host}:#{port}"
    if process.env['NODE_ENV'] is 'development' 
      repl = require 'repl' .start 'f3 > ' 
      repl.context.api = api
      api.info 'Type .help for repl usage guide'
  catch
    console.log e