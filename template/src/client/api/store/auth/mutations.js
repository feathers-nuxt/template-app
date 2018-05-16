export const mutations = {
    
    /* SIGN_UP mutation */
    SET_SIGN_UP_PENDING (state) {
      state.isSignUpPending = true
      console.log('SIGN_UP mutation: SET Sign Up pending.')
    },
    UNSET_SIGN_UP_PENDING (state) {
      state.isSignUpPending = false
      console.log('SIGN_UP mutation: UNSET Sign Up pending')
    },
    SET_SIGN_UP_ERROR (state, error) {
      state.errorOnSignUp = Object.assign({}, error)
      console.log('SIGN_UP mutation: SET Sign Up Error.', error)
    },
    CLEAR_SIGN_UP_ERROR (state) {
      state.errorOnSignUp = undefined
      console.log('SIGN_UP mutation: CLEAR Sign Up Error.')
    },
    
    /* SIGN_IN mutation */
    SET_SIGN_IN_PENDING (state) {
      state.isSignInPending = true
      console.log('SIGN_IN mutation: SET Sign In pending.')
    },
    UNSET_SIGN_IN_PENDING (state) {
      state.isSignInPending = false
      console.log('SIGN_IN mutation: UNSET Sign In pending')
    }, 
    SET_ACCESS_TOKEN (state, payload) {
      state.accessToken = payload
      console.log('SIGN_IN mutation: SET accessToken')
    }, 
    SET_PAYLOAD (state, payload) {
      state.payload = payload
      console.log('SIGN_IN mutation: SET payload')
    }, 
    SET_USER (state, payload) {
      state.user = payload
      console.log('SIGN_IN mutation: SET user')
    },
    SET_SIGN_IN_ERROR (state, error) {
      state.errorOnSignIn = Object.assign({}, error)
      console.log('SIGN_IN mutation: SET Sign In Error.', error)
    },
    CLEAR_SIGN_IN_ERROR (state) {
      state.errorOnSignIn = undefined
      console.log('SIGN_IN mutation: CLEAR Sign In Error.')
    },
        
    /* SIGN_OUT mutation */
    SET_SIGN_OUT_PENDING (state) {
      state.isSignInPending = true
      console.log('SIGN_OUT mutation: SET Sign Out pending.')
    },
    UNSET_SIGN_OUT_PENDING (state) {
      state.isSignInPending = false
      console.log('SIGN_OUT mutation: UNSET Sign Out pending')
    },
    SET_SIGN_OUT_ERROR (state, error) {
      state.errorOnSignOut = Object.assign({}, error)
      console.log('SIGN_OUT mutation: SET Sign Out Error.', error)
    },
    CLEAR_SIGN_OUT_ERROR (state) {
      state.errorOnSignOut = undefined
      console.log('SIGN_OUT mutation: CLEAR Sign Out Error.')
    },
    CLEAR_AUTH_DATA (state) {
      state.payload = undefined
      state.accessToken = undefined
      if (state.user) {
        state.user = undefined
      }
      console.log('SIGN_OUT mutation: CLEAR Auth Data.')
    },
    
    /* DELETE_ACCOUNT mutation */
    SET_DELETE_ACCOUNT_PENDING (state) {
      state.isDeleteAccountPending = true
      console.log('DELETE_ACCOUNT mutation: SET Delete Account pending.')
    },
    UNSET_DELETE_ACCOUNT_PENDING (state) {
      state.isDeleteAccountPending = false
      console.log('DELETE_ACCOUNT mutation: UNSET Delete Account pending.')
    },
    SET_DELETE_ACCOUNT_ERROR (state, error) {
      state.errorOnSignUp = Object.assign({}, error)
      console.log('DELETE_ACCOUNT mutation: SET Delete Account Error.', error)
    },
    CLEAR_DELETE_ACCOUNT_ERROR (state) {
      state.errorOnSignUp = undefined
      console.log('DELETE_ACCOUNT mutation: CLEAR Delete Account Error.')
    }
    
}