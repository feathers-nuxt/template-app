serializeError = require 'serialize-error'

module.exports = ->
  (hook) ->
    message = "#{hook.method.to-upper-case!} #{hook.path}"
    if hook.type is 'error'
      message += "::Error: #{hook.error.message}" 
      hook.app.error message, serializeError hook.error
      # console.log 'hook' Object.keys hook
    else
      hook.app.info message
    # hook.app.debug 'hook.data', hook.data
    # hook.app.debug 'hook.params', hook.params
    # hook.app.debug 'hook.result', hook.result if hook.result
    hook