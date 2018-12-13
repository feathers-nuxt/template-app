Sequelize = require 'sequelize'

Op = Sequelize.Op
operatorsAliases =
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col

module.exports = ->
  app = @

  {sequelize: config} = app.get 'database'

  if not config then
    app.error 'missing required config for sequelize'
    process.exit 1

  {database, username, password} = config
  config.operatorsAliases = operatorsAliases

  try 
    connection = new Sequelize database, username, password, config
    app.set 'sequelize', connection
  catch e
    app.error 'Error connecting to the database:'
    console.log e
    console.log config
    process.exit 1
