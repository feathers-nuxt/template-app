// import io from 'socket.io-client'

// import socketio from '@feathersjs/socketio-client'


// import { addListener } from 'storyboard';
// import wsClientListener from 'storyboard-listener-ws-client';
// import browserExtListener from 'storyboard-listener-browser-extension';

// import * as storyboard from 'storyboard';

// import AuthManagement from 'feathers-authentication-management/lib/client'

import { hooks, clearCookie } from '~utils'

import rest from '@feathersjs/rest-client'
import feathers from '@feathersjs/feathers'
import authentication from '@feathersjs/authentication-client'


export default async function(ctx) {
  // initialize feathers rest client
  if(process.client) { // on browser pocess only

    const { app, nuxtState } = ctx
    const { config } = nuxtState
    const { host, port } = config
    const storage = window.localStorage

    const feathersClient = feathers()

    feathersClient.hooks(hooks)
    feathersClient.configure(rest(`http://${host}:${port}/api`).axios(app.$axios))
    feathersClient.configure(authentication({ storage, service: 'logins', jwtStrategy: 'jwt', path: '/authentication' }))

    // automatically logout once jwt expires
    feathersClient.on('authenticated', ({user}) => setTimeout(feathersClient.logout, ( new Date(user.validTill) - Date.now() )) )

    // automatically navigate to login page after logout
    feathersClient.on('logout', () => app.router.push({ path: '/' })  )

    // logout if token invalidated
    if(app.store.state.auth.errorOnAuthenticate) {
      var delete_cookie = (name) => document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'

      feathersClient.logout().then(() => {
        delete_cookie('feathers-jwt')
        app.store.commit(`auth/clearAuthenticateError`)
      })

    }

    return feathersClient

  }
}
