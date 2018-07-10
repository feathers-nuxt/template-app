import serializeError from 'serialize-error'

export default {

  setError(state, error) {
    state.error = Object.assign({}, serializeError(error))
  },

  clearError(state) {
    state.error = null
  },

}