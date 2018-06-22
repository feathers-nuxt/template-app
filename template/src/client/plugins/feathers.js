import Vue from 'vue'
import { initClient } from '~utils'

import * as storyboard from 'storyboard';
import feathersVuex from 'feathers-vuex';

export default async function (ctx) {

  const { app, isDev } = ctx

  Vue.use({
    install(Vue, options) {
      Vue.mixin({
        created: function () {
          // access feathersClient on any component
          this.$storyboard = storyboard
        }
      })
    }
  })  
  
  if(process.client) {
    const feathersClient = await  initClient(ctx)    
    const { FeathersVuex } = feathersVuex(feathersClient, { idField: 'id' })
    Vue.use(FeathersVuex)

    if(isDev) {
      window.app = app
      window.Vue = Vue
    }
  }
  

  // if(process.client) {

  //   // wait until nuxt is initialized
  //   window.onNuxtReady((nuxt) => {

  //     //nuxtReady event fires for HMR as well
  //     //dont reinitialize feathersClient during HRM
  //     if (isHMR) return

  //     //attach store to window for easy debugging from browser console
  //     if (isDev) window.store = store

  //     const client = initClient(ctx)
  //     const feathersClient = client
  //     // console.log('isDev', app.api)

  //     const { FeathersVuex } = ctx.app.feathers.vuex
  //     // const { FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' })
  //     Vue.use(FeathersVuex)
  //     // console.log('isDev', FeathersVuex)
      

  //     Vue.use({
  //       install(Vue, options) {
  //         Vue.mixin({
  //           created: function () {
  //             // access feathersClient on any component
  //             this.$api = feathersClient
  //           }
  //         })
  //       }
  //     })

  //   })

  // }

}
