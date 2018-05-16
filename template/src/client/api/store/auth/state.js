export default function() {
  return {
    isSignUpPending: false,
    errorOnSignUp: null,
    errorOnSignIn: null,
    errorOnSignOut: null,
    
    
    accessToken: null, // The JWT
    payload: null, // The JWT payload
    isAuthenticatePending: false,
    isLogoutPending: false,
    errorOnAuthenticate: null,
    errorOnLogout: null,
    userService: '/users',
    redirectTo: '/store',
    user: null
  }
}