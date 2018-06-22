import { sync } from 'vuex-router-sync'

export default ({app: {store, router}}) => {
  sync(store, router)
  // console.error('~plugins/vue-router-sync', store, router)
}