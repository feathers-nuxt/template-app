import serializeError from 'serialize-error'

export default {

  setOnline(state, payload) {
    state.online = payload
  },

  setOffline(state) {
    state.online = false
  },

}