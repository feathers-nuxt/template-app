
export const crashPlugin = (store) => {

  return store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'crash/setError':
        // store.$router.app.$storyboard.mainStory.info('casl:store:plugin', 'user logged in, setting access rules')
        // store.app.api.storyboard.mainStory.trace('casl:vuex', '@store/plugins/crash app crashed')
        console.log('######crash', store.state.crash.error.code )
        // store.commit('route/')

        break
    }
  })

}
