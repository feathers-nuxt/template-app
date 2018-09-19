export default {
  async authenticate(store, credentials) {
    const { commit, state, dispatch } = store
    const feathersClient = this.app.api

    commit('setAuthenticatePending')

    if (state.errorOnAuthenticate) {
      commit('clearAuthenticateError')
    }

    try {
      const response = await feathersClient.authenticate(credentials)
      // Populate the user if the userService was provided
      // console.log('#######response', response)
      commit('setAccessToken', response.accessToken)
      if (state.userService && response.hasOwnProperty('user')) {
        await dispatch('populateUser', response.user)
      }
      return response
    } catch (error) {
      commit('setAuthenticateError', error)
      return Promise.reject(error)
    } finally {
      commit('unsetAuthenticatePending')
    }
    
  },
  populateUser({ commit, state }, user) {
    commit('setUser', user)
    // const feathersClient = this.app.api
    // return feathersClient.service(state.userService)
    //   .get(user.id)
    //   .then(user => {
    //     commit('setUser', user)
    //     return user
    //   })
  },
  async logout({ commit }) {
    commit('setLogoutPending')
    const feathersClient = this.app.api
    try {
      const response = feathersClient.logout()
      commit('logout')
      commit('unsetLogoutPending')
      console.log('commited logout')
      return response
    } catch (error) {
      console.error('auth/logout action error error', error)
      return Promise.reject(error)
    }
  }
}



// // Import the Feathers client module that we've created before
// import api from 'src/api'

// const auth = {

//   // keep track of the logged in user
//   user: null,

//   getUser() {
//     return this.user
//   },

//   fetchUser (accessToken) {

//     return api.passport.verifyJWT(accessToken)
//       .then(payload => {
//         return api.service('users').get(payload.userId)
//       })
//       .then(user => {
//         return Promise.resolve(user)
//       })
//   },

//   authenticate () {

//     return api.authenticate()
//       .then((response) => {
//         return this.fetchUser(response.accessToken)
//       })
//       .then(user => {
//         this.user = user
//         return Promise.resolve(user)
//       })
//       .catch((err) => {
//         this.user = null
//         return Promise.reject(err)
//       })
//   },

//   authenticated () {
//     return this.user != null
//   },

//   signout () {

//     return api.logout()
//       .then(() => {
//         this.user = null
//       })
//       .catch((err) => {
//         return Promise.reject(err)
//       })
//   },

//   onLogout (callback) {

//     api.on('logout', () => {
//       this.user = null
//       callback()
//     })
//   },

//   onAuthenticated (callback) {

//     api.on('authenticated', response => {
//       this.fetchUser(response.accessToken)
//       .then(user => {
//         this.user = user
//         callback(this.user)
//       })
//       .catch((err) => {
//         callback(this.user)
//       })
//     })
//   },

//   register (email, password) {
//     return api.service('users').create({
//       email: email,
//       password: password
//     })
//   },

//   login (email, password) {
//     return api.authenticate({
//       strategy: 'local',
//       email: email,
//       password: password
//     })
//   }

// }

// export default auth