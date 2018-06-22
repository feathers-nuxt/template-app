// export default function (ctx) {
  
//   let { app, store, redirect, isServer, isClient } = ctx
//   console.log('authenticated page middleware', store.state.auth.accessToken)

//   if (!store.state.auth.accessToken) {
//     return redirect('/')
//   }

//   if(isClient) {
//     // alert('authentication middleware')    
//   }

// }

export default function ({ store, redirect, error }) {
  // console.log('authenticating...', redirect)
  if (!store.state.auth.user) {
    // error({
    //   message: 'Access denied',
    //   statusCode: 403
    // })
    redirect('/')
  }
}