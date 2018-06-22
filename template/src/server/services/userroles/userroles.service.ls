createService = require 'feathers-sequelize'

createModel = require './userroles.model'
hooks = require './userroles.hooks'

module.exports = ->
  app = @ 
  options =
    Model: createModel app
    paginate: app.get 'paginate'
  app.use '/userroles', createService options
  (app.service 'userroles').hooks hooks
  return