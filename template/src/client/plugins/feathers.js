import { initClient } from '~utils'

export default async (ctx, inject) => {
  let api // feathers server or client instance
  if(process.server) {
    // use feathers server instance for SSR
    api = ctx.req.api
  } else {
    // use feathers rest client instance on the browser
    api = await initClient(ctx, ctx.nuxtState.config) 

    //attach app to window for easy debugging from browser console
    if(ctx.isDev) window.app = ctx.app 

    // wait until nuxt is initialized
    window.onNuxtReady(() => {

      //nuxtReady event fires for HMR as well
      //dont reinitialize feathersClient during HRM
      if (ctx.isHMR) return
      ctx.nuxtState.services.forEach( path => api.service(path) )
    })
  }
  
  // inject feathers app to vue context
  inject('api', api)

  if(process.server) { 
    ctx.req.api.info(`DONE @plugins/feathers initialized`)
  }

}
