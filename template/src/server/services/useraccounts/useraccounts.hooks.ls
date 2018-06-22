{addVerification,removeVerification} = require('feathers-authentication-management').hooks
{hashPassword} = require('@feathersjs/authentication-local').hooks
{authenticate} = require('@feathersjs/authentication').hooks
{restrictToOwner} = require('feathers-authentication-hooks')
_ = require('feathers-hooks-common')

ensureEnabled = require('../../hooks/ensure-enabled')
setDefaultRole = require('../../hooks/set-default-role')
setFirstUserToRole = require('../../hooks/set-first-user-to-role')
hasPermissionBoolean = require('../../hooks/has-permission-boolean')
sendVerificationEmail = require('../../hooks/send-verification-email')
preventDisabledAdmin = require('../../hooks/prevent-disabled-admin')

restrict = [
  # authenticate('jwt')
  # ensureEnabled!
  # _.unless (hasPermissionBoolean 'manageUsers'), restrictToOwner idField: '_id' ownerField: '_id'
]

schema =
  include:
    * service: \accountstatuses name-as: \status parent-field: \statusId child-field: \id
    * service: \users name-as: \profile parent-field: \userId child-field: \id
    * service: \partneruseraccounts name-as: \organization parent-field: \id child-field: \userAccountId include: {
      service: \partners name-as: \profile parent-field: \partnerId child-field: \id }

serializeSchema =
  computed:
    permissions: (item, hook) -> _.get item, 'access.permissions'
  exclude: ['access', '_include']

module.exports =
  before:
    all: []
    find: [].concat(restrict),
    get: [].concat(restrict),
    create: [
      hashPassword!,
      # addVerification!, # adds .isVerified, .verifyExpires, .verifyToken, .verifyChanges
      # setDefaultRole!,
      # setFirstUserToRole(role: 'admin'),
      # preventDisabledAdmin!
    ]
    update: [
      _.disallow('external')
    ]
    patch: [
      # preventDisabledAdmin!,
      _.iff(
        _.isProvider('external'),
        # _.preventChanges(
        #   'email',
        #   'isVerified',
        #   'verifyToken',
        #   'verifyShortToken',
        #   'verifyExpires',
        #   'verifyChanges',
        #   'resetToken',
        #   'resetShortToken',
        #   'resetExpires'
        # )
      ),
    ].concat(restrict),
    remove: [].concat(restrict)
  after:
    all: [
      _.when(
        (hook) -> hook.params.provider ,
        _.discard('password', '_computed', 'verifyExpires', 'resetExpires', 'verifyChanges')
      )
    ]
    find: [
      _.populate( schema: schema ),
      # _.serialize(serializeSchema),
    ]
    get: [
      _.populate( schema: schema ),
      # _.serialize(serializeSchema),
    ]
    create: [
      # sendVerificationEmail!,
      # removeVerification! #removes verification/reset fields other than .isVerified
    ]
    update: []
    patch: []
    remove: []
  error:
    all: []
    find: []
    get: []
    create: []
    update: []
    patch: []
    remove: []
