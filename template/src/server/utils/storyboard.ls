storyboard = require 'storyboard'
{addListener} = storyboard

module.exports.consoleListener = (api) ->
  consoleListener = (require 'storyboard-listener-console').default
  addListener consoleListener #if process.env.NODE_ENV isnt 'production'
  api.storyboard = storyboard
  api


module.exports.wsServerListener = (api) -> (socketServer) ->
  authenticate = ({ login, password }) ->
    isAuthorized(login, password)
  # If your application uses sockets with auth, namespace them
  # so that they don't clash with the log server's:
  # At the server...
  # socketServer = io.of('/storyboard')
  # socketServer.use(authenticate)
  # socketServer.on('connection', myConnectFunction)
  wsServerListener = (require 'storyboard-listener-ws-server').default
  addListener wsServerListener, { socketServer }
