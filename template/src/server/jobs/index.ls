startWorkers = require './workers'
startScheduler = require './scheduler'
prepareQueue = require './queue'

module.exports = ->
  app = @
  {resque} = @.get 'database'
  
  process.on 'nuxt:build:done', (err) ->>
    throw err if err
    
    try
      workers = await startWorkers app, resque
      scheduler = await startScheduler app, resque
      queue = await prepareQueue app, resque
    catch
      console.log '@@@@@@@@@@@@@@@@@@@@@anyone' e
    
    app.set 'resque', queue

    # ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].for-each (eventType) ->
    ['SIGINT', 'SIGTERM'].for-each (eventType) ->
      process.on eventType, ->>
        await workers.end!
        await scheduler.end!
        await queue.end!
        console.log '$hutdown.', eventType
        process.exit 1
