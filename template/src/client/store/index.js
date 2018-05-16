import decode from 'jwt-decode'
import { sync } from 'vuex-router-sync'

import { initAuth } from '~api'

export const actions = {

	async nuxtServerInit (store, ctx) {
		const { commit, dispatch } = store
		const { req } = ctx

		// hydrates state on cookie into vuex store
		initAuth({
			req,
			commit,
			dispatch,
			moduleName: 'auth',
			cookieName: 'feathers-jwt'
		})

		// synchronise vue router state with vuex store state
		sync(ctx.app.store, ctx.app.router) 

		// avail feathers server app to nuxt context
		ctx.app.api = req.app

		return initAuth
	}
	
}

