users = require '~/services/users/users.service'
# roles = require '~/services/roles/roles.service'
# message = require '~/services/message/message.service'
settings = require '~/services/settings/settings.service'
notifications = require '~/services/notifications/notifications.service'
# auth = require '~/services/auth-management/auth-management.service'

module.exports = ->
  app = this
  app.configure notifications
  # app.configure auth
  app.configure users
  app.configure settings
  # app.configure roles
  # app.configure message
  return 