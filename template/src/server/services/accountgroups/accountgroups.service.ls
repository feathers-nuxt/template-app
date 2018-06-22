createService = require 'feathers-sequelize'

createModel = require './accountgroups.model'
hooks = require './accountgroups.hooks'

module.exports = ->
  app = @ 
  options =
    Model: createModel app
    paginate: app.get 'paginate'
  app.use '/accountgroups', createService options
  (app.service 'accountgroups').hooks hooks
  return