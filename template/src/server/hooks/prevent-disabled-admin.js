const _ = require('lodash')
const {GeneralError,NotAcceptable,NotFound} = require('feathers-errors')

export const preventDisabledAdmin = options => async hook => {
  if (!hook.params.provider) { return hook; }

  if(hook.data.isEnabled === false) {

    let query = {}

    if(hook.id) {
      query = { _id: hook.id }
    } else if(_.get(hook, 'data._id')) {
      query = { _id: hook.data._id }
    } else if (_.get(hook, 'data.name')) {
      query = { name: hook.data.name }
    } else if (_.get(hook, 'data.email')) {
      query = { email: hook.data.email }
    }

    let [err, result] = await to(hook.app.service('users').find({ query }))

    let user = _.get(result, 'data.0') || _.get(result, '0')

    if(err) {
      throw new GeneralError(`Something went wrong on the server and we could not search users.`)
    } else if(user && user.role === 'admin') {
      throw new NotAcceptable(`An admin cannot be disabled.`)
    } else if(!user) {
      throw new NotFound(`Could not check if user is an admin.`)
    }
  }

  return hook
}
