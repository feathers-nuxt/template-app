export default function ({ store, redirect, error }) {
  // ensure user is authenticated
  if (store.state.auth.user) {
  	// // throw 
    // error({
    //   message: 'Access denied',
    //   statusCode: 403
    // })
    // // or redirect
    redirect('/messages/compose')
  }
}