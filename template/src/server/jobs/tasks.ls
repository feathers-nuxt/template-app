# See https://github.com/taskrabbit/node-resque

module.exports = (app) ->
  sampleTask:
    perform: (params) ->>
      console.log 'performing sampleTask with params ' params
