
export default function ({ store, error, redirect }) {
  if (store.state.crash.error) {
  	// integrate your error reporter
  	// or throw error 
  	// or redirect
    console.log('@@@@@crashed...', store.state.crash.error)
    // error(store.state.crash.error)
    // redirect('/')
  }
}