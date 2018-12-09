const openProfilerStory = (context) => {
  const {app, path, method, params} = context
  if (!params.query) { params.query = {} }
  app.storyboard.log = app.storyboard.mainStory.child({ 
    src: 'client', title: `${method} /${path}`, level: 'DEBUG' 
  })
  params.query.storyId = app.storyboard.log.storyId
  context
}

const closeProfilerStory = (context) => {
  const {app} = context
  app.storyboard.log.close()
  context
}

const dispatchToVuex = (context) => {
  const {app} = context
  console.log(' catch api request error ', context.error)
  // app.app.store.commit('crash/setError', context.error)
  context
}

const discardUser = (context) => {
  // don't send user in request params while client side
  if(context.params) delete context.params.user
  // context.result = 'discardUser'
  context
}

const getFromCache = (context) => {
  // respond with content from local cache
  // context.result = 'discardUser'
  context
}

export default {
  before: {
    all: [
      // openProfilerStory
      discardUser
    ],
    find: [],
    get: [
      getFromCache
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [
      dispatchToVuex
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  finally: {
    all: [
      // closeProfilerStory
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};