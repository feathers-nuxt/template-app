const _ = require('lodash')
const {GeneralError,NotAcceptable,NotFound} = require('feathers-errors')

module.exports = (options) ->
  (hook) ->>
    return hook if not hook.params.provider
    if hook.data.isEnabled is false
      query = {}
      if hook.id
        query = {_id: hook.id}
      else
        if _.get hook, 'data._id'
          query = {hook.data._id}
        else
          if _.get hook, 'data.name' then query = {hook.data.name} else if _.get hook, 'data.email' then query = {hook.data.email}
      [err, result] = await (hook.app.service 'users').find {query: query}
      user = (_.get result, 'data.0') or _.get result, '0'
      if err
        throw new GeneralError 'Something went wrong on the server and we could not search users.'
      else
        if user and user.role is 'admin' then throw new NotAcceptable 'An admin cannot be disabled.' else if not user then throw new NotFound 'Could not check if user is an admin.'
    hook
