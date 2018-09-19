import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

import feathersVuex, { initAuth } from 'feathers-vuex'

import { addListener } from 'storyboard';
import wsClientListener from 'storyboard-listener-ws-client';
import browserExtListener from 'storyboard-listener-browser-extension';

import * as storyboard from 'storyboard';

import AuthManagement from 'feathers-authentication-management/lib/client'

import { hooks } from '~utils'

export default async function(ctx, log) {
  
  let { app, store, req, config, nuxtState } = ctx
  let { commit, dispatch } = store

  let storage
  let authenticationPath
  let services

  if (process.client) { 
    config = nuxtState.config
    services = nuxtState.services    
  }

  const host = process.env.HOST || config.host 
  const port = process.env.PORT || config.port 

  const feathersClient = feathers()

  if (process.server) {

    services = Object.keys(req.api.services)

    // feathers SSR client config

    storage = require('localstorage-memory')
    const rest = require('@feathersjs/rest-client')
    const axios = require('axios')

    // Create an instance using the config defaults provided by the library
    // At this point the timeout config value is `0` as is the default for the library
    const instance = axios.create({
      timeout: 2000,
      headers: {
        Cookie: req.get('cookie')
      }
    });
    // ensure no auth header is sent
    delete instance.defaults.headers.common['Authorization'];

    feathersClient.configure(rest(`http://${host}:${port}/api`).axios(instance))

    authenticationPath = '/authentication'

    feathersClient.storyboard = req.api.storyboard

    storage.clear()
    
  }

  if (process.client) {

    // feathers browser client config 
    // console.log('beforeNuxtRender', nuxtState)

    storage = new CookieStorage({ path: '/' })
    const socket = io(`http://${host}:${port}`)

    feathersClient.configure(socketio(socket, { timeout: 6000 }))

    socket.on('connect', () => { 
      commit('network/setOnline', true)
      // console.log('nuxt socket.io connected') 
    })
    socket.on('event', (data) => { 
      // console.log('nuxt socket.io event', data) 
    })
    socket.on('disconnect', (data) => { 
      commit('network/setOnline', false)
      // console.log('nuxt socket.io disconnect', data) 
    })
    socket.on('reconnect', (data) => { 
      // console.log('nuxt socket.io reconnect', data) 
    })


    window.addEventListener("offline", () => { 
      commit('network/setOnline', false)
      console.log('network down') 
    });
    window.addEventListener("online", () => { 
      if(socket.connected) {
        commit('network/setOnline', true)
        console.log('network up') 
      }
      console.log('network up. SERVER DOWN') 
    });

    // Client
    addListener(browserExtListener);
    addListener(wsClientListener, { uploadClientStories: true, clockSync: true });

    authenticationPath = '/api/authentication'

    feathersClient.storyboard = storyboard

    feathersClient.on('authenticated', (session) => {
      const {id, accessToken, user} = session
      const expireAt = new Date(user.validTill)
      const expireAfter = expireAt - Date.now()
      // console.log('::session will expire at ', expireAt)
      setTimeout(async () => {
        await feathersClient.logout()
        if(location.pathname !== '/') {
          location.reload()
        }
        alert('session expired')
      }, expireAfter);

    })

  }  


    
  feathersClient.configure(authentication({ 
    storage,
    jwtStrategy: 'jwt', 
    service: 'logins', 
    path: authenticationPath
  }))

  feathersClient.hooks(hooks)

  app.api = feathersClient 
  app.api.app = app // circular reference. for fun and profit

  // register feathers services as store modules using featers-vuex
  // See https://feathers-plus.github.io/v1/feathers-vuex/service-module.html
  const { service } = feathersVuex(feathersClient)
  services.forEach(path => {
    const options = {
      skipRequestIfExists: true, // cache first retrieval
      debug: true
    }
    service(path, options)(ctx.app.store)
  } );
  

  // set user object on auth store module
  if (process.server) { 

		// set access token and jwt payload on auth store module
    // with values deserialized from cookie in req
    // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$ initClient', req.path)

    if(!req.path.split('/').reverse()[0].includes('css') && req.path != '/') {
      initAuth({
        req,
        commit,
        dispatch,
        moduleName: 'auth',
        cookieName: 'feathers-jwt'
      })
      app.api.storyboard.mainStory.info('nuxt', 'initAuth DONE')
    }
    
    
  }

  if(ctx.app.store.state.auth) {
  
    if (ctx.app.store.state.auth.accessToken) {
      
      try {
        if (process.client) { 
          await dispatch('auth/authenticate', { accessToken: ctx.store.state.auth.accessToken })
          // console.log('auth/authenticate client side')
        } else {
          // do not authenticate request for static resources
          if(!req.path.split('/').reverse()[0].includes('css') && req.path != '/') {
            await dispatch('auth/authenticate', { accessToken: ctx.store.state.auth.accessToken })
            // console.log('auth/authenticate server side')
          }
        }
        app.api.storyboard.mainStory.info('nuxt', 'authenticate DONE')
        // console.log('@@@@@@@@@@@@@@@@@', res)
      } catch (error) {
        if (process.client) { 
          console.error('feathersClient authentication error', error)
          app.api.storyboard.mainStory.error('nuxt', 'dispatch auth/authenticate')
          await dispatch('auth/logout')
          console.log('reauthenticate', ctx.store.state.auth.accessToken)
          // await dispatch('auth/authenticate', { accessToken: ctx.store.state.auth.accessToken })
        }        
      }
      
    } else {
      storage.clear() // clear stale cookie if present
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!initClient :: no access token', storage.length)
    }

  } else {
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!initClient :: no vuex auth module')
  }

  feathersClient.authManagement = new AuthManagement(feathersClient)
  
  return feathersClient

}
