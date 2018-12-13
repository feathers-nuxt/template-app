schema = require './users.schema'
<% if(database == 'sql'){%>
options = 
  # don't delete entries but set the newly added attribute deletedAt
  # to the current date (when deletion was done)
  # paranoid will only work if timestamps are enabled
  paranoid: true
  timestamps: true
# create sequelize model using provided schema and options
module.exports = (app) -> 
  {define} = app.get 'sequelize' 
  define 'users', schema, options
<%}else{%>
# create mongoose model using instantiated schema instance
module.exports = (app) ->
  {model, Schema} = app.get 'mongoose'
  model \User new Schema schema
<%}%>
