path = require 'path'
Sequelize = require 'sequelize'

module.exports = ->
  app = this
  options =
    # logging: false
    dialect: 'sqlite'
    storage: path.join __dirname, 'data', 'db.sqlite'
  sequelize = new Sequelize 'sequelize', '', '', options
  app.set 'sequelize', sequelize