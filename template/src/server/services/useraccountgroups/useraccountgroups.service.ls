createService = require 'feathers-sequelize'

createModel = require './useraccountgroups.model'
hooks = require './useraccountgroups.hooks'

module.exports = ->
  app = @ 
  options =
    Model: createModel app
    paginate: app.get 'paginate'
  app.use '/useraccountgroups', createService options
  (app.service 'useraccountgroups').hooks hooks
  return