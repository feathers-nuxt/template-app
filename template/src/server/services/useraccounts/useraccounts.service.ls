createService = require 'feathers-sequelize'

createModel = require './useraccounts.model'
hooks = require './useraccounts.hooks'

module.exports = ->
  app = @ 
  options =
    Model: createModel app
    paginate: app.get 'paginate'
  app.use '/useraccounts', createService options
  (app.service 'useraccounts').hooks hooks
  return