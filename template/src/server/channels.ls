module.exports = (app) ->
  return  if typeof app.channel isnt 'function'
  app.on 'connection', (connection) ->
    app.storyboard.mainStory.info 'app in channel', connection
    (app.channel 'anonymous').join connection
    return 
  app.on 'login', (authResult, {connection}) -> 
    if connection
      (app.channel 'anonymous').leave connection
      (app.channel 'authenticated').join connection
    return 
  app.publish ((data, hook) ->
    app.info 'Publishing all events to all authenticated users.'
    app.channel 'authenticated')
  return 