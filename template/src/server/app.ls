path = require 'path'
favicon = require 'serve-favicon'
express = require '@feathersjs/express'

# nuxt = require './middleware/nuxt'
nuxt = require './middleware'
api = require './api'

app = express!
app.use '/api', api # api routes
# app.use nuxt.render # nuxt routes
app.use nuxt api # nuxt routes
app.use (err, req, res, next) ->
  console.error '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$' err.stack
  next err
app.use '/static', express.static api.get 'public'
app.use favicon path.join (api.get 'public'), 'favicon.ico'

module.exports = app