import Vue from 'vue'
import { initClient } from '~utils'

import * as storyboard from 'storyboard';
import feathersVuex from 'feathers-vuex';

export default async function (ctx) {

  const { app, isDev } = ctx
  
  if(process.client) {
    const feathersClient = await  initClient(ctx)    
    const { FeathersVuex } = feathersVuex(feathersClient, { idField: 'id' })
    Vue.use(FeathersVuex)

    if(isDev) {
      window.app = app
      window.Vue = Vue
    }
  }

}
