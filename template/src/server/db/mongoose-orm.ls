mongoose = require \mongoose
mongoose.Promise = global.Promise

module.exports = ->
  {mongodb} = @get \database
  mongoose.connect mongodb
  @set \mongoose mongoose