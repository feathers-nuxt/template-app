{ authenticate } = require('@feathersjs/authentication').hooks
{ NotAuthenticated } = require('@feathersjs/errors')
verifyIdentity = authenticate('jwt')

hasToken = (hook) ->
  console.log 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbility rules', Object.keys hook.data
  return false if hook.params.headers is void
  if hook.data.accessToken is void then return false
  hook.params.headers.authorization or hook.data.accessToken

module.exports = (hook) ->>
  try
    return await verifyIdentity hook
  catch error
    return hook if error instanceof NotAuthenticated and not hasToken hook
    throw error
  return 