import Vue from 'vue'

import * as storyboard from 'storyboard'

export default async function (ctx) {

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

}
