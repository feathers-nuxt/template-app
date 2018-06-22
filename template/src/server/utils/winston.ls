{createLogger, format, transports} = require 'winston'

markup = (info) ->
  ts = info.timestamp .slice 0, 19 .replace 'T', ' '
  if info.args
    inspectable = info.level > 3 and ((Object.keys info.args).length or (Object.getOwnPropertyNames info.args).length)
    args = if inspectable then JSON.stringify info.args, null, 2 else ''
    "#{ts} [#{info.level}]: #{info.message} #{args}";
  else
    "#{ts} [#{process.pid}] [#{info.level}]: #{info.message.trim!}"

fileFormat = format.combine format.timestamp!, format.align!, format.splat!, format.printf markup
consoleFormat = format.combine format.colorize!, format.timestamp!, format.align!, format.splat!, format.printf markup

winston = createLogger (
  level: 'verbose'
  format: fileFormat
  transports: 
    new transports.File filename: 'error.log', level: 'error' 
    new transports.File filename: 'combined.log'
    ... 
)
if process.env.NODE_ENV isnt 'production'
  winston.add new transports.Console format: consoleFormat, colorize: true, level: 'info'

module.exports = winston
