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

export default async function(ctx, log) {
  
  let { app, store, req, config, nuxtState } = ctx
  let { commit, dispatch } = store

  let storage
  let authenticationPath

  if (process.client) { 
    config = nuxtState.config
  }

  const host = process.env.HOST || config.host 
  const port = process.env.PORT || config.port 

  const feathersClient = feathers()

  if (process.server) {

    // feathers SSR client config

    storage = require('localstorage-memory')
    const rest = require('@feathersjs/rest-client')
    const axios = require('axios')

    feathersClient.configure(rest(`http://${host}:${port}/api`).axios(axios, {
      headers: {
        Cookie: req.get('cookie')
        // authorization: req.header('authorization')
      }
    }))

    authenticationPath = '/authentication'
    
  }

  if (process.client) {

    // feathers browser client config 

    app.$storyboard = storyboard

    storage = new CookieStorage({ path: '/' })
    const socket = io(`http://${host}:${port}`)

    feathersClient.configure(socketio(socket, { timeout: 6000 }))

    socket.on('connect', () => { 
      commit('network/setOnline', true)
      console.log('nuxt socket.io connected') 
    })
    socket.on('event', (data) => { 
      console.log('nuxt socket.io event', data) 
    })
    socket.on('disconnect', (data) => { 
      commit('network/setOnline', false)
      console.log('nuxt socket.io disconnect', data) 
    })
    socket.on('reconnect', (data) => { 
      console.log('nuxt socket.io reconnect', data) 
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

  }  

    
  feathersClient.configure(authentication({ 
    storage,
    jwtStrategy: 'jwt', 
    service: 'useraccounts', 
    path: authenticationPath
  }))

  app.feathers = {
    client : feathersClient,
    vuex : feathersVuex(feathersClient)
  }

  app.api = feathersClient 

  // register service and auth store plugins
  const { service, auth } = app.feathers.vuex

  service('useraccounts')(ctx.app.store) 
  service('sourceaddresses')(ctx.app.store)
  service('partners')(ctx.app.store)
  service('roles')(ctx.app.store)
  service('users')(ctx.app.store)
  service('userprofiles')(ctx.app.store)
  service('accountgroups')(ctx.app.store)
  service('accountgrouproles')(ctx.app.store)
  service('messages')(ctx.app.store)
  service('messagetypes')(ctx.app.store)
  service('contacts')(ctx.app.store)
  service('contactgroups')(ctx.app.store)
  service('contactlists', { 
    instanceDefaults: { 
    } 
  })(ctx.app.store)
  service('compose')(ctx.app.store)
  service('services')(ctx.app.store)
  service('schedules')(ctx.app.store)
  // auth({
  //   userService: 'useraccounts',
  //   state: {
  //     useraccount: null
  //   }
  // })(ctx.app.store)
  

  // set user object on auth store module
  if (process.server) { 

		// set access token and jwt payload on auth store module
		// with values deserialized from cookie in req
		initAuth({
			req,
			commit,
			dispatch,
			moduleName: 'auth',
			cookieName: 'feathers-jwt'
    })
    if(log) {
      log.info('initAuth', 'populated access token and jwt payload on auth store module')
    }
    
  }

  if(ctx.app.store.state.auth) {
    
    if(log) {
      log.info('initClient', 'attempting authentication')
    }

    if (ctx.app.store.state.auth.accessToken) {
      try {
        await dispatch('auth/authenticate', { accessToken: ctx.store.state.auth.accessToken })
        if(log) {
          log.info('authenticate', 'populated user object on auth store module')
        }
        // console.log('@@@@@@@@@@@@@@@@@', res)
      } catch (error) {
        if(log) {
          log.error('initClient', 'dispatch auth/authenticate')
        }
        console.log('feathersClient authentication error', error)
      }
    }

  } else {
    console.log('initClient :: no access token')
  }

  // console.log(`init client on ${process.client ? 'client': 'server'}`, ctx.app.store.state.auth)

  // feathersClient.auth = AuthManagement(feathersClient)

  // feathersClient.service('sourceaddresses')
  // feathersClient.service('partners')
  // feathersClient.service('roles')
  // feathersClient.service('users')
  // feathersClient.service('userprofiles')
  // feathersClient.service('accountgroups')
  // feathersClient.service('accountgrouproles')
  // feathersClient.service('messages')
  // feathersClient.service('messagetypes')
  // feathersClient.service('contacts')
  // feathersClient.service('contactgroups')
  // feathersClient.service('partners')


  return feathersClient

}

// const authManagement = new AuthManagement(app);

// // check props are unique in the users items
// authManagement.checkUnique(identifyUser, ownId, ifErrMsg)

// // resend sign up verification notification
// authManagement.resendVerifySignup(identifyUser, notifierOptions)

// // sign up or identityChange verification with long token
// authManagement.verifySignupLong(verifyToken)

// // sign up or identityChange verification with short token
// authManagement.verifySignupShort(verifyShortToken, identifyUser)

// // send forgotten password notification
// authManagement.sendResetPwd(identifyUser, notifierOptions)

// // forgotten password verification with long token
// authManagement.resetPwdLong(resetToken, password)

// // forgotten password verification with short token
// authManagement.resetPwdShort(resetShortToken, identifyUser, password)

// // change password
// authManagement.passwordChange(oldPassword, password, identifyUser)

// // change identity
// authManagement.identityChange(password, changesIdentifyUser, identifyUser)

// // Authenticate user and log on if user is verified. v0.x only.
// authManagement.authenticate(email, password)
