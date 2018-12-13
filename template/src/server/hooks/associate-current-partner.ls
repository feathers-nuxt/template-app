{ get, set } = require('lodash')

defaults = idField: 'id' as: 'partnerId'

module.exports = (options = {}) ->
  (hook) ->
    console.log "associateCurrentPartnerassociateCurrentPartnerassociateCurrentPartnerassociateCurrentPartner", hook.params.user
    setId = (obj) -> set obj, options.as, id
    throw new Error "The 'associateCurrentPartner' hook should only be used as a 'before' hook." if hook.type isnt 'before'
    if not hook.params.user
      return hook if not hook.params.provider
      throw new Error 'There is no current user to associate.'
    options = Object.assign {}, defaults, (hook.app.get 'authentication'), options
    id = get hook.params.user, options.idField
    if id is void then throw new Error "Current user is missing '#{options.idField}' field."
    if Array.isArray hook.data then hook.data.forEach setId else setId hook.data
    return 