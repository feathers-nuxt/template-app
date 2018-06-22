{ AbilityBuilder, Ability } = require('@casl/ability')
{ Forbidden } = require('@feathersjs/errors')

Ability.addAlias 'update', 'patch'
# Ability.addAlias 'read', ['get', 'find']
Ability.addAlias 'remove', 'delete'
Ability.addAlias 'view', 'read'

TYPE_KEY = Symbol.for 'type'

subjectName = (subject) ->
  return subject if not subject or typeof subject is 'string'
  subject[TYPE_KEY]

defineRulesFor = (user) ->
  { rules, can } = AbilityBuilder.extract!
  can 'view'    <[ reports ]>
  can 'create'  <[ authentication ]>
  can 'read'    <[ useraccounts messages ]>
  can 'create'  <[ contacts ]> if Object.keys(user.authorization).includes 'contacts' and user.authorization.contacts.includes 'create'
  rules

defineAbilitiesFor = (user) ->
  rules = defineRulesFor user
  # if user
    # can 'manage', ['contacts', 'messages'], {createdBy: user._id}
    # can ['read', 'update'], 'users', {createdBy._id}
  new Ability rules, {subjectName: subjectName}

canReadQuery = (query) -> query isnt null

module.exports = (name) ->
  (hook) ->> 
    hook.result.useraccount.authorization =
      partners: <[ create read update delete ]>
      messages: <[ create read cancel reschedule export ]>
      reports: <[ create read ]>
      contacts: <[ create read update delete archive ]>
    action = hook.method
    service = if name then hook.app.service name else hook.service
    serviceName = name or hook.path
    rules = defineRulesFor hook.result.useraccount
    ability = defineAbilitiesFor hook.result.useraccount
    throwUnlessCan = (action, resource) ->
      throw new Forbidden "You are @@@@@@@@@@@@@@@@@@@@ not allowed to #{action} #{serviceName}" if ability.cannot action, resource
      return 
    hook.params.ability = ability
    hook.result.useraccount.rules = rules
    if hook.method is 'create'
      hook.data[TYPE_KEY] = serviceName
      #throwUnlessCan 'create' hook.data
    # if not hook.id
    #   query = toMongoQuery ability, serviceName, action
    #   if canReadQuery query then Object.assign hook.params.query, query else hook.params.query.$limit = 0
    #   return hook
    params = Object.assign {}, hook.params, {provider: null}
    #result = await service.get hook.id, params
    # console.log 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbility rules', action, hook.params.provider, hook.params.ability
    # result[TYPE_KEY] = serviceName
    #throwUnlessCan action, result if hook.path isnt hook.app.get('authentication').path
    #if action is 'get' then hook.result = result
    hook 