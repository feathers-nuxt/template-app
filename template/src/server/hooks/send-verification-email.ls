dispatcher = require '~/notifications/dispatcher'

module.exports = (opts) ->
  options = if opts then opts else {}
  (hook) ->
    return hook if not hook.params.provider
    user = hook.result
    (dispatcher hook.app).dispatch 'verifySignup', user, hook
    hook
