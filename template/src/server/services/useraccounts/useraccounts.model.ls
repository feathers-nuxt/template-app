schema = require './useraccounts.schema'

options = 
  # don't delete database entries but set the newly added attribute deletedAt
  # to the current date (when deletion was done). paranoid will only work if timestamps are enabled
  paranoid: true
  timestamps: true

# return function to create sequelize model using provided schema and options
module.exports = (app) -> (app.get 'sequelize').define 'user_accounts', schema, options