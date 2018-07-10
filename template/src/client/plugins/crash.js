import Vue from 'vue'

import { crashPlugin } from '~utils/store/plugins/crash'


export default function (ctx) {

  const { app, store, isHMR, isDev } = ctx

  // register vuex store plugin for crash
  crashPlugin(store)

  // console.log(' @plugins/crash initialized plugin ')

}