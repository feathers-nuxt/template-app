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

		const log = ctx.req.api.storyboard.mainStory.child({
			src: 'store:main:module',
			title: `nuxtServerInit ${ process.client ? 'client' : 'server'} bundle`,
			level: 'DEBUG',
		})

		// synchronise vue router state with vuex store state
		sync(ctx.app.store, ctx.app.router) 

		// avail feathers server instance to nuxt ssr for api calls rpc
    // req.api = req.api // (with provider null?)

    const config = {
      host: req.api.get('host'),
      port: req.api.get('port')
    }

    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.config = config
    })

    ctx.config = config

		// setup feathersClient
		// avails auth and service store modules
		await initClient(ctx, log) 

		// // set access token and jwt payload on auth store module
		// // with values deserialized from cookie in req
		// initAuth({
		// 	req,
		// 	commit,
		// 	dispatch,
		// 	moduleName: 'auth',
		// 	cookieName: 'feathers-jwt'
		// })
		log.close()

		return initAuth
	}
	
}


