import Vue from 'vue'
import { abilitiesPlugin } from '@casl/vue'

import { abilityPlugin, abilityInstance } from '~utils/store/plugins/casl'


export default function (ctx) {

  const { app, store, isHMR, isDev } = ctx

  // register vuex store plugin for casl
  abilityPlugin(store)

  // register vue ui plugin for casl
  Vue.use(abilitiesPlugin, abilityInstance)

  // console.log('casl:vue', '@plugins/casl initialized plugin ')

}