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
  # connection = new Sequelize config.database, config.username, config.password, config
  # app.set 'sequelize', connection
  # create singleton connection object
  orm = new Connection database, username, password, config
    .then -> console.log 'connection established'
  app.set 'orm', orm
  {sequelize, Sequelize, models} = orm
  app.set 'sequelize', sequelize
  try
    await connection.authenticate!
  catch {message}
    console.log '<><>Unable to connect to the database:' message, sequelize
    process.exit 1