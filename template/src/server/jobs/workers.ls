NodeResque = require 'node-resque'

createJobs = require './tasks'

# fn to init worker(s)
module.exports = (app, options) ->>
  worker = new NodeResque.Worker connection: options, queues: <[ Bulk BulkBroadcast Broadcast ]>, createJobs app
  
  worker.on 'start', ->
    app.info 'worker started'

  worker.on 'end', ->
    app.info 'worker ended'

  worker.on 'cleaning_worker', (worker, pid) ->
    app.info "cleaning old worker #{worker}"

  # worker.on 'poll', (queue) ->
  #   app.info "worker polling #{queue}"

  # worker.on 'ping', (time) ->
  #   app.info "worker check in @ #{time}"

  worker.on 'job', (queue, job) ->
    # app.info "working job #{queue} #{JSON.stringify(job)}"
    app.info "working job in #{queue} queue"

  worker.on 'reEnqueue', (queue, job, plugin) ->
    app.info "reEnqueue job (#{plugin}) #{queue} #{JSON.stringify(job)}"

  worker.on 'success', (queue, job, result) ->
    # console.log "job success #{queue} #{JSON.stringify(job)} >> #{result}", result
    app.info 'job success ', Object.assign {}, task: job, result: result

  worker.on 'failure', (queue, job, failure) ->
    app.error "job failure #{queue} #{JSON.stringify(job)} >> #{failure}"

  worker.on 'error', (error, queue, job) ->
    app.error "error #{queue} #{JSON.stringify(job)}  >> #{error}"

  # worker.on 'pause', ->
  #   app.info 'worker paused'
  
  # ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].for-each (eventType) ->>
  #   process.on eventType, await worker.end! if worker

  
  await worker.connect!
  
  worker.start!

  worker
