export default {
  async signup(store, params) {
    const { state, rootState, getters, rootGetters, commit, dispatch } = store
    console.log('store auth/register >>>>>', params)
    //        this.app.router.app.$Notice.success({title: 'titl', desc: 'messag', duration: 16})
    dispatch('logout')
    commit('SIGN_UP_REQUEST')
    try {
      const user = await this.app.api.services.users.create(params)
      this.app.router.app.$Notice.success({
        title: 'Account signup successful',
        desc: `Welcome ${params.first_name} ${params.last_name} to tendapa marketplace. Check you email ${user.email} for instructions on verification of your account`,
        duration: 16
      })
      commit('SIGN_UP_SUCCESS', user)
      try {
        const auth = await dispatch('authenticate', {
          strategy: 'local',
          email: params.email,
          password: params.password
        })
        commit('SIGN_IN_SUCCESS', auth)
      } catch (error) {
        console.log('auth signup authenticate error', error)
        return Promise.reject(error)
      }
    } catch (error) {
      this.app.router.app.$Notice.error({
        title: error.code + ': ' + error.name,
        desc: error.message,
        duration: 16
      })
      //            console.log('auth signup error', error)
      commit('SIGN_UP_FAILURE', error)
      return Promise.reject(error)
    }
  },
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
      if (state.userService && response.hasOwnProperty('useraccount')) {
        await dispatch('populateUser', response.useraccount)
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