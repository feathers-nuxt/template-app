path = require 'path'
Sequelize = require 'sequelize'

Connection = require 'sequelize-connect'

module.exports = ->>
  app = @

  {sequelize: config} = app.get 'database' 

  if not config then
    app.error 'missing required config for sequelize'
    process.exit 1

  {database, username, password} = config
  config.discover = [__dirname + '../services' ]

  try
    # orm = await new Connection database, username, password, config
    # console.log 'connection established' orm
    # {sequelize, Sequelize, models} = orm
    # app.set 'sequelize', sequelize
    # app.set 'orm', orm
    connection = new Sequelize database, username, password, config
    app.set 'sequelize', connection
  catch e
    app.error 'Error connecting to the database:'
    console.log e
    console.log config
    process.exit 1