accountgrouproles = require './accountgrouproles/accountgrouproles.service'
accountgroups = require './accountgroups/accountgroups.service'
accountstatuses = require './accountstatuses/accountstatuses.service'
notifications = require './notifications/notifications.service'
settings = require './settings/settings.service'
uploads = require './uploads/uploads.service'
useraccountgroups = require './useraccountgroups/useraccountgroups.service'
useraccounts = require './useraccounts/useraccounts.service'
userprofiles = require './userprofiles/userprofiles.service'
userroles = require './userroles/userroles.service'
users = require './users/users.service'
auth = require './auth'

module.exports = !->
  app = this
  app.configure auth      # authentication service behind /api/authentication
  app.configure accountgrouproles
  app.configure accountgroups
  app.configure accountstatuses
  app.configure notifications
  app.configure settings
  app.configure uploads
  app.configure useraccountgroups
  app.configure useraccounts
  app.configure userprofiles
  app.configure userroles
  app.configure users