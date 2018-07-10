import Vue from 'vue'
import decode from 'jwt-decode'
import { sync } from 'vuex-router-sync'

// import { initAuth, initClient } from '~utils'
import { initClient } from '~utils'
import { initAuth } from 'feathers-vuex'

export const actions = {

	// this function runs on server side only
	async nuxtServerInit (store, ctx) {
		const { commit, dispatch } = store
		const { req, beforeNuxtRender } = ctx

		// synchronise vue router state with vuex store state
		sync(ctx.app.store, ctx.app.router)

    const config = {
      host: req.api.get('host'),
      port: req.api.get('port')
    }

    // pass in params from server to client 
    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.config = config
      nuxtState.services = Object.keys(req.api.services)
    })

    ctx.config = config
    
		// setup feathersClient for SSR
		await initClient(ctx)

		return initAuth
	}
	
}


