createService = require 'feathers-sequelize'

createModel = require './accountstatuses.model'
hooks = require './accountstatuses.hooks'

module.exports = ->
  app = @ 
  options =
    Model: createModel app
    paginate: app.get 'paginate'
  app.use '/accountstatuses', createService options
  (app.service 'accountstatuses').hooks hooks
  return