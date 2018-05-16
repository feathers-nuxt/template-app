import Vue from 'vue'
import initFeathersClient from '~api'

export default function (ctx) { 
    window.onNuxtReady((nuxt) => {

      const { app, store, isHMR, isDev} = ctx
      if(isDev) window.store = store

      const client = initFeathersClient(ctx)
      const feathersClient = client
      // console.log('isDev', app.api)

      Vue.use({
        install (Vue, options) {
          Vue.mixin({
            created: function () {
              // access feathersClient on any component
              this.$api = feathersClient
            }
          })
        }
      })

    })
}
