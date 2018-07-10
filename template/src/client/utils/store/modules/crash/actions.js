export default {
  setError({ commit }, error) {
    commit('setError', error)
  },
  clearError({ commit }) {
    commit('clearError')
  }

}