import Vue from 'vue'
import fuzzysort from 'fuzzysort'

Vue.use({
  install (Vue, options) {
    Vue.mixin({
      created: function () {
        this.$fuzzysort = fuzzysort
      }
    })
  }
})
