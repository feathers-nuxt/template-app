{NotAuthenticated, GeneralError, Forbidden} = require '@feathersjs/errors'
_ = require 'lodash'

module.exports = (permission) ->
  (hook) ->
    return hook if not hook.params.provider
    if (_.get hook, 'params.user.role') is 'admin' then return hook
    name = (_.get hook, 'params.user.name') or _.get hook, 'params.user.email'
    if not _.get hook, 'params.user'
      errmsg = 'Cannot read user permissions.'
      errmsg += 'The current user is missing. '
      errmsg += 'Seems you are not authenticated.'
      throw new NotAuthenticated errmsg
    else
      if not _.get hook, 'params.user.permissions'
        throw new GeneralError name + ' does not have any permissions.'
      else
        errmsg = name + ' does not have permission to do that.'
        if not hook.params.user.permissions.includes permission then throw new Forbidden errmsg
    return 