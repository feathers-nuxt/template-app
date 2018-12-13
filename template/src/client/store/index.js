import { initAuth } from '~utils'
import { sync } from 'vuex-router-sync'

export const actions = {

	// this function runs on server side only
	async nuxtServerInit (store, ctx) { 

		// const { commit, dispatch } = store
		const { req, beforeNuxtRender } = ctx

		req.api.log({ level: 'silly', message: `${req.method} HTTP ${req.httpVersion}` })
		req.api.info(`INIT @nuxtServerInit ${req.url}` )

		// synchronise vue router state with vuex store state
		sync(ctx.app.store, ctx.app.router)

		ctx.app.store.commit("config/setLogo", "/logo.png")

		req.api.info(`FORK @nuxtServerInit CALL initAuth` )

		// retrive user from cookie token into vuex state
		await initAuth({ req, commit: ctx.app.store.commit })
		
		const config = { 
			protocol: req.api.get('protocol'), 
			host: req.api.get('domain'), 
			port: req.api.get('port') 
		}
		
		// pass in params from server to client 
		beforeNuxtRender(async ({ nuxtState }) => { 
			nuxtState.config = config
			nuxtState.services = Object.keys(req.api.services)
		})
		
		req.api.info(`DONE @nuxtServerInit ` )
	}
	
}


