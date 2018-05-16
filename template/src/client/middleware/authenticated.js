export default function (ctx) {
  
  let { app, store, redirect, isServer, isClient } = ctx
  console.log('authenticated page middleware', store.state.auth.accessToken)

  if (!store.state.auth.accessToken) {
    return redirect('/auth/signin')
  }

  if(isClient) {
    // alert('authentication middleware')    
  }

}