createService = require 'feathers-sequelize'

createModel = require './settings.model'
hooks = require './settings.hooks'

module.exports = ->
  app = @ 
  options =
    Model: createModel app
    paginate: app.get 'paginate'
  app.use '/settings', createService options
  (app.service 'settings').hooks hooks
  return