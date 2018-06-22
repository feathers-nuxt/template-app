createService = require 'feathers-sequelize'

createModel = require './accountgrouproles.model'
hooks = require './accountgrouproles.hooks'

module.exports = ->
  app = @ 
  options =
    Model: createModel app
    paginate: app.get 'paginate'
  app.use '/accountgrouproles', createService options
  (app.service 'accountgrouproles').hooks hooks
  return