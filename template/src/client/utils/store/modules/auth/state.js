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
    userService: 'api/proxyusers',
    redirectTo: '/messages/compose',
    user: null
  }
}