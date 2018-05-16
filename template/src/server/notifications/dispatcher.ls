heml = require 'heml'
path = require 'path'
pug = require 'pug'

options =
  validate: 'soft'
  cheerio: {}
  juice: {}
  beautify: {}
  elements: [] 

getLink = (app, type, hash) ->
  protocal = 'http://' 
  port = app.get 'port'
  host = app.get 'host' 
  return protocal + host + port + '/login' + '/' + type + '/' + hash

sendEmailNotification = (app, notification) ->
  console.log 'sendEmailNotification >>>', Object.keys notification
  (((app.service 'notifications').create notification).then ((result) ->
    # console.log 'Sent EmailNotification ++++++++', result
    return )).catch ((err) ->
      console.log 'Error sending EmailNotification', err
      return )

verifySignup = (app, user, hook) ->
  emailAccountTemplatesPath = path.join(app.get('src'), '..', 'src', 'server', 'notifications', 'templates')
  templatePath = path.join emailAccountTemplatesPath, 'verify-signup.pug'
  returnEmail = (app.get 'complaint_email') or process.env.COMPLAINT_EMAIL
  hashLink = getLink app, 'verify', user.verifyToken
  context =
    email: user.name or user.email
    returnEmail: returnEmail 
    name: (hook.data.name)
    hashLink: hashLink
    logo: ''
  compiledHTML = (pug.compileFile templatePath) context 
  (heml compiledHTML, options).then ((compiledEmail) ->
    # console.log 'compiledEmail >>>><<<<< '      
    notification =
      email:
          to: (hook.data.email)
          from: (app.get 'SMTP_USER')
          subject: 'subject'
          html: compiledEmail.html
    # console.log 'sending verification email ', notification
    sendEmailNotification app, notification )

module.exports = (app) ->
    dispatch: (notification, user, hook) ->
        console.log 'notifications dispatch > ', notification
        notification.apply null, [app, user, hook] if typeof notification is 'function'
        return 