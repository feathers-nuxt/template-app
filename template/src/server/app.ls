path = require 'path'

cors = require 'cors'
helmet = require 'helmet'
winston = require 'winston'
compress = require 'compression'
favicon = require 'serve-favicon'

configuration = require '@feathersjs/configuration'
feathers = require '@feathersjs/feathers'
socketio = require '@feathersjs/socketio'
express = require '@feathersjs/express'
logger = require 'feathers-logger'

middleware = require '~/middleware'
appHooks = require '~/app.hooks'
services = require '~/services'
channels = require '~/channels'
db = require '~/sequelize'
auth = require '~/auth'

app = express feathers!

app.configure logger winston
app.configure configuration!
app.configure express.rest!
app.configure socketio!
app.configure db
app.configure services
app.configure channels
app.configure auth

app.use cors!
app.use helmet!
app.use compress!
app.use express.json!
app.use express.urlencoded {extended: true}
app.use '/static', express.static (app.get 'public')
app.use favicon path.join (app.get 'public'), 'icon.png'

app.configure middleware #ensure middleware conf is last

app.hooks appHooks

app.use express.notFound!
app.use express.errorHandler {logger: winston}

module.exports = app