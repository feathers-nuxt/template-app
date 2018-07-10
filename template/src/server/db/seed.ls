# functions to create initial data
fs = require 'fs'
path = require 'path'

module.exports = (app, assert, seeds) ->>
  try    
    console.log 'seeds.roles', seeds
    await seed-all app, assert, seeds
    process.exit 0
  catch
    console.log e
    process.exit 1

seed-all = (app, assert, seeds) ->>

  seed-roles = (require './migrations/01-roles.js').seed

  # seed-roles = ->>
  #   permissions = []
  #   actions = <[ manage find get create update patch remove ]>
  #   for resource in Object.keys app.services
  #     for action in actions
  #       permissions.push code: "#{action.to-upper-case!}_#{resource.to-upper-case!}" description: "#{action} #{resource}"
  #   await assert 'roles' permissions

  # 02 userstatuses
  seed-account-statuses = ->>
    await assert 'accountstatuses' [
    * code: 'CREATED' description: 'User can access system'
    * code: 'ACTIVED' description: 'User can access system'
    * code: 'DEACTIVATED' description: 'User can NOT access system'
    ]

  # 03 accountgroups
  seed-account-groups = ->>
    await assert 'accountgroups' [
    * name: 'SYSTEM_ADMINISTRATOR' description: 'Unrestricted rights over system'
    * name: 'ORGANIZATION_OWNER' description: 'Unrestricted rights over partner organization'
    * name: 'ORGANIZATION_MANAGER' description: 'Limited rights over partner organization'
    * name: 'ORGANIZATION_MEMBER' description: 'Very limited rights over partner organization'
    ]

  # 04 users
  seed-user = ->>
    await assert 'users' surname: 'suedoe' otherNames: 'Sue Doe' phone: '254769609906' email: 'suedoe@gmail.com'

  # 05 useraccounts
  seed-user-account = (user, status) ->>
    await assert 'useraccounts' username: 'suedoe' password: 'su3do3' userId: user.id, statusId: status.id

  # 06 useraccountgroups
  seed-user-account-group = (account, group) ->>
    await assert 'useraccountgroups' accountId: account.id, groupId: group.id

  # 07 userroles
  seed-user-roles = (user, roles) ->>
    userroles = []
    for role in roles
      userroles.push userId: user.id, roleId: role.id
    await assert 'userroles' userroles 

  
  app.info '=========seeding database========='

  # 01 create roles lookup
  roles = await seed-roles app, assert
  app.info 'seeded roles', roles.length

  # 02 create account statuses lookup
  statuses = await seed-account-statuses!
  app.info 'seeded accountstatus', statuses.length

  active_status = statuses[0] # note active status object
  app.info 'seeded active_status', active_status

  # 03 create account groups lookup
  groups = await seed-account-groups!
  app.info 'seeded accountgroups', groups.length
  
  sudoers_group = groups[0] # note sudoers group object
  app.info 'seeded sudoers_group', sudoers_group

  # 04 create root user
  root_user = await seed-user!
  root_user = root_user[0] if Array.isArray root_user
  app.info 'seeded root_user', root_user

  # 05 create root user account
  root_user_account = await seed-user-account root_user, active_status
  root_user_account = root_user_account[0] if Array.isArray root_user_account
  app.info 'seeded root_user_account', root_user_account
  
  # 06 create root user account group
  root_user_account_group = await seed-user-account-group root_user_account, sudoers_group
  app.info 'seeded root_user_account_group', root_user_account_group

  # 07 create root user roles
  root_user_roles = await seed-user-roles root_user, roles
  app.info 'seeded root_user_roles', root_user_roles.length

  app.info '=========seeded database========='
