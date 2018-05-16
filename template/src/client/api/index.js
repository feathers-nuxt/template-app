import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'

import AuthManagement from  'feathers-authentication-management/lib/client'

async function initClient (ctx) {
	const {isServer, isClient, app, store} = ctx

    const host = process.env.HOST || '127.0.0.1'
    const port = process.env.PORT || '3000'

    const feathersClient = feathers()

    let storage

    if(isServer) {
        storage = require('localstorage-memory')  
        const rest = require('@feathersjs/rest-client')
        const axios = require('axios')      
        const { req } = ctx
        feathersClient.configure(rest(`http://${host}:${port}`).axios(axios, {
            headers: {
              Cookie: req.get('cookie'),
            //   authorization: req.header('authorization')
            }
          }))
        console.log('server side feathersClient ', feathersClient)
    }

    if(isClient) {
        storage = new CookieStorage({ path: '/' })
        const socket = io(`http://${host}:${port}`)
        feathersClient.configure(socketio(socket, { timeout: 60000 }))        
        socket.on('connect', () => { console.log('nuxt socket.io connected') })
        socket.on('event', (data) => { console.log('nuxt socket.io event',data) })
        socket.on('disconnect', (data) => { console.log('nuxt socket.io disconnect',data) })
        socket.on('reconnect', (data) => { console.log('nuxt socket.io reconnect',data) })
        window.feathers = feathersClient
        app.api = feathersClient
        
    }


    feathersClient.configure(auth({jwtStrategy: 'jwt', storage}))

    feathersClient.auth = AuthManagement(feathersClient)

    feathersClient.service('users') 

    if(isClient) {
        
        if(ctx.store.state.auth.accessToken) {
            // alert('about to authenticate')
            try {
                await store.dispatch('auth/authenticate', { accessToken: ctx.store.state.auth.accessToken })
                console.log('feathersClient browser instance authenticated')
            } catch (error) {
                console.log('feathersClient browser instance authentication error', error)
            }
        }

    }

    return feathersClient

}


export default initClient

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

export function initAuth (options) {
    const authDefaults = {
      commit: undefined,
      req: undefined,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    }
  const { commit, req, moduleName, cookieName } = Object.assign({}, authDefaults, options)

  if (typeof commit !== 'function') {
    throw new Error('You must pass the `commit` function in the `initAuth` function options.')
  }
  if (!req) {
    throw new Error('You must pass the `req` object in the `initAuth` function options.')
  }

  const accessToken = readCookie(req.headers.cookie, cookieName)
  const payload = getValidPayloadFromToken(accessToken)

  if (payload) {
    commit(`${moduleName}/setAccessToken`, accessToken)
    commit(`${moduleName}/setPayload`, payload)
  }
  return Promise.resolve(payload)
}

// Pass a decoded payload and it will return a boolean based on if it hasn't expired.
function payloadIsValid (payload) {
  return payload && payload.exp * 1000 > new Date().getTime()
}

function getValidPayloadFromToken (token) {
  if (token) {
    try {
      var payload = decode(token)
      return payloadIsValid(payload) ? payload : undefined
    } catch (error) {
      return undefined
    }
  }
  return undefined
}
// Reads and returns the contents of a cookie with the provided name.
function readCookie (cookies, name) {
  if (!cookies) {
    console.log('no cookies found')
    return undefined
  }
  var nameEQ = name + '='
  var ca = cookies.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

