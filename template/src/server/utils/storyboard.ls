storyboard = require 'storyboard'
{addListener} = storyboard

authenticate = ({ login, password }) ->
  isAuthorized(login, password)

module.exports = (app) -> (socketServer) ->
  consoleListener = (require 'storyboard-listener-console').default
  wsServerListener = (require 'storyboard-listener-ws-server').default

  app.storyboard = storyboard
  
  if process.env.NODE_ENV isnt 'production'
    addListener consoleListener
  # If your application uses sockets with auth, namespace them
  # so that they don't clash with the log server's:
  # At the server...
  # socketServer = io.of('/storyboard')
  # socketServer.use(authenticate)
  # socketServer.on('connection', myConnectFunction)
  addListener wsServerListener, { socketServer }
