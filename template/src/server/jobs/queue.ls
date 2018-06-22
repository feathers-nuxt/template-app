NodeResque = require 'node-resque'

createJobs = require './tasks'

module.exports = (app, options) ->>
  queue = new NodeResque.Queue connection: options, createJobs app
  queue.on 'error', (e) -> console.log \NodeResque.Queue.Error e
  # ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].for-each (eventType) ->>
  #   process.on eventType, await queue.end! if queue
  await queue.connect!
  await queue.cleanOldWorkers 666
  queue