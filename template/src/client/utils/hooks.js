

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
  app.app.store.commit('crash/setError', context.error)
  // app.app.nuxt.error(context.error)
  context
}

export default {
  before: {
    all: [openProfilerStory],
    find: [],
    get: [],
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
    all: [closeProfilerStory],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};