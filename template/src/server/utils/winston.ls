{createLogger, format, transports} = require 'winston'
{join} = require('path')

markup = (info) ->
  ts = info.timestamp #.slice 0, 19 .replace 'T', ' '
  if info.args
    inspectable = info.level > 3 and ((Object.keys info.args).length or (Object.getOwnPropertyNames info.args).length)
    args = if inspectable then JSON.stringify info.args, null, 2 else ''
    "#{ts} [#{info.level}] #{info.message} #{args}";
  else
    "#{ts} [#{process.pid}] [#{info.level}] #{info.message.trim!}"

fileFormat = format.combine format.timestamp!, format.align!, format.splat!, format.printf markup
consoleFormat = format.combine format.colorize!, format.timestamp!, format.align!, format.splat!, format.printf markup

module.exports = (api) -> 
  {dir, levels} = api.get 'logger'
  if levels.length
    fileTransports = levels.map (level) -> new transports.File filename: (join dir, "#{level}.log"), level
    fileTransports.push new transports.File filename: (join dir, 'combined.log')
  else
    fileTransports = 
      new transports.File filename: (join dir, 'error.log'), level: 'error' 
      new transports.File filename: (join dir, 'combined.log')
      ...
  winston = createLogger format: fileFormat, transports: fileTransports, level: 'debug'
  winston.add new transports.Console format: consoleFormat, colorize: true, level: 'silly'
  # if process.env.NODE_ENV isnt 'production'
  #   winston.add new transports.Console format: consoleFormat, colorize: true, level: 'info'
  api.set \winston winston
  winston
