NodeResque = require 'node-resque'

# fn to init job scheduler
module.exports = (app, options) ->>
  scheduler = new NodeResque.Scheduler connection: options

  scheduler.on 'start', ->
    app.info "scheduler started"

  scheduler.on 'end', ->
    app.info "scheduler ended"

  # scheduler.on 'poll', ->
  #   app.info "scheduler polling"

  scheduler.on 'master', (state) ->
    app.info "scheduler became master"

  scheduler.on 'cleanStuckWorker', (workerName, errorPayload, delta) ->
    app.info "failing #{workerName} (stuck for #{delta}s) and failing job #{errorPayload}"

  scheduler.on 'error', (error) ->
    app.error "scheduler error >> #{error}"

  scheduler.on 'workingTimestamp', (timestamp) ->
    app.info "scheduler working timestamp #{timestamp}"

  scheduler.on 'transferredJob', (timestamp, job) ->
    app.info "scheduler enquing job #{timestamp} >> #{JSON.stringify(job)}"

  # ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].for-each (eventType) ->>
  #   process.on eventType, (await scheduler).end! if scheduler


  await scheduler.connect!
  
  scheduler.start!

  scheduler