{ getItems } = require('feathers-hooks-common')
to = require '../utils/to'

module.exports = (options = {}) ->
  (hook) ->
    new Promise((resolve, reject) ->> 
      if hook.data
        [ err, defaultRole ] = await to hook.app.service('settings').find({ name: 'defaultRole' })
        if not err
          defaultRole = _.get defaultRole, '0'
          role = (_.get defaultRole, 'value.role') or 'basic'
          (_.castArray getItems hook).forEach ((item) -> item.role = role)
        else
          console.log 'Error setting default role', err
        resolve hook
    )
