path = require 'path'
favicon = require 'serve-favicon'
express = require '@feathersjs/express'

nuxt = require './middleware' # nuxt SSR middleware
api = require './api' # feathers-express app

# this is a simple express application
app = express!

# include feathers-express as a sub app namespaced behind '/api' 
# An Express app is valid middleware. See https://expressjs.com/en/api.html#app.use
app.use '/api', api # routes starting with /api/ will be processed by feathers

# include middleware for rendering nuxt routes
app.use nuxt api # routes NOT starting with /api/ will be processed by nuxt

# include middleware to serve static content from the configured “public” directory
# See /src/server/confid/default.yml for “public” directory configuration
app.use '/static', express.static api.get 'public'

# include middleware to serve favicon image from the configured “public” directory
app.use favicon path.join (api.get 'public'), 'favicon.ico'


module.exports = app