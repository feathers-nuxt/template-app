debug = (require 'debug') 'notifications-service'

createService = require '@feathers-nuxt/feathers-notifme'

hooks = require './notifications.hooks'

module.exports = ->
  app = this
  options = 
    useNotificationCatcher: false
    channels: 
      email:
        providers: [
          #* type: 'logger'
          * type: 'smtp',
            port: 465,
            secure: true,
            host: (app.get 'SMTP_HOST'),
            auth: user: (app.get 'SMTP_USER'), pass: (app.get 'SMTP_PASSWORD')
        ]
  app.use '/notifications', createService options
  service = app.service 'notifications'
  service.hooks hooks
  return
