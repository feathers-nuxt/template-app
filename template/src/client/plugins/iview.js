import Vue from 'vue'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'

Vue.use(iView, { locale })

Vue.use({
  install (Vue, options) {
    Vue.mixin({
      created: function () {
        this.$Notice = iView.Notice
        this.$Message = iView.Message
      }
    })
  }
})