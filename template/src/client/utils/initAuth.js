import decode from 'jwt-decode'
const { AbilityBuilder } = require('@casl/ability')

export default function(options) {
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
  if(accessToken) {    
    return req.api.authenticate('jwt', {})(req)
      .then(async (result = {}) => {
        if (result && result.success == true) {
          const {user, payload} = result.data
          user.profile = user.user  
          const {token} = user
          delete user.user
          authorize(user)

          // // Since we are rendering on the server we have to pass the authenticated user
          // // from `req.user` as `params.user` to our services
          // const params = {
          //   user, query: {}
          // };
          // // Find the list of users
          // const users = await req.api.service('proxyshortcodes').find(params);
   
          commit(`${moduleName}/setAuthenticatePending`)
          commit(`${moduleName}/setAccessToken`, token)
          commit(`${moduleName}/setPayload`, payload)
          commit(`${moduleName}/setUser`, user)
          commit(`${moduleName}/unsetAuthenticatePending`)

          req.api.info(`DONE @initAuth:authenticate  `) 
        } else {
          // authentication failed
          req.api.warn(`FAIL @initAuth:authenticate`) 
          if(result.challenge.code == 404) {
            commit(`${moduleName}/setAuthenticateError`, result)

          }
        }
      }).catch((error) => { 
          // authentication request failed
          req.api.error(`FAIL @initAuth:authenticate request`)
      })
  } else {
    req.api.warn(`BAIL @initAuth:authenticate cookie missing` ) 
  }


}

// Reads and returns the contents of a cookie with the provided name.
function readCookie(cookies, name) {
  if (!cookies) {
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

function getValidPayloadFromToken(token) {
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

// Pass a decoded payload and it will return a boolean based on if it hasn't expired.
function payloadIsValid(payload) {
  return payload && payload.exp * 1000 > new Date().getTime()
}


function defineRulesFor(user){
  var ref$, rules, can, i$, len$, module, actions, j$, len1$, action;
  ref$ = AbilityBuilder.extract(), rules = ref$.rules, can = ref$.can;
  if (user.permissions && typeof user.permissions === 'object') {
    for (i$ = 0, len$ = (ref$ = Object.keys(user.permissions)).length; i$ < len$; ++i$) {
      module = ref$[i$];
      actions = eval('(' + user.permissions[module] + ')');
      for (j$ = 0, len1$ = actions.length; j$ < len1$; ++j$) {
        action = actions[j$];
        can(action, module);
      }
    }
  }
  return rules;
};

function authorize(user){
  user.authorization = defineRulesFor(user);
};