logger = require 'winston'

module.exports = ->
  (hook) ->
    message = hook.type + ':' + hook.path + ' - Method: ' + hook.method
    message += ' : ' + hook.error.message if hook.type is 'error'
    logger.info message
    logger.debug 'hook.data', hook.data
    logger.debug 'hook.params', hook.params
    if hook.result then logger.debug 'hook.result', hook.result
    if hook.error then logger.error hook.error
    return 