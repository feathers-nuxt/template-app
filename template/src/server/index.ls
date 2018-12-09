# https://docs.feathersjs.com/api/configuration.html
process.env['NODE_CONFIG_DIR'] = (require 'path').join __dirname, 'config/'

api = require './api' # serve data as json

app = (require '@feathersjs/express')! # express instance to namespaced route paths
api.use (require 'compression')! # Compress response bodies so as to lessen size of payload
app.use '/api', api # mount feathers instance as express sub-app to serve routes prefixed with /api
app.use (require 'cookie-parser')!, (require './middleware') api # nuxt middleware to serve all other routes

process.on 'unhandledRejection', (reason, p) -> console.log 'Unhandled Rejection ', p, reason

process.on 'nuxt:build:done', (err) ->>
  console.log err and process.exit err if err
  try
    api.setup await app.listen api.get 'port'
    api.info "OK app listening on http://#{api.get('host')}:#{api.get('port')}"
    api.info "OK pid: #{process.pid} environment: #{process.env['NODE_ENV']}"
  catch
    console.log e and process.exit e