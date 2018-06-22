path = require 'path'
Sequelize = require 'sequelize'

module.exports = ->>
  {sequelize} = @.get 'database' 
  connection = new Sequelize sequelize.database, sequelize.username, sequelize.password, sequelize
  @.set 'sequelize', connection
  try
    await connection.authenticate!
  catch {message}
    console.error 'Unable to connect to the database:' message, sequelize
    process.exit 1