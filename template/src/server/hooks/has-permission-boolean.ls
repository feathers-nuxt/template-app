_ = require 'lodash'
errors = require 'feathers-errors'

module.exports = (permission) ->
  (hook) ->
    return true if not hook.params.provider
    if not (_.get hook, 'params.user.role') is 'admin' 
    or not _.get hook, 'params.user.permissions' 
    or not hook.params.user.permissions.includes permission 
    then false else true