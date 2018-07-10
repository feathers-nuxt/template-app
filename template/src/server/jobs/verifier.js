import { Verifier as AuthLocalVerifier } from '@feathersjs/authentication-local';

import { Verifier as AuthJWTVerifier } from '@feathersjs/authentication-jwt';

const errors = require('@feathersjs/errors');

export class LocalVerifier extends AuthLocalVerifier {
  // The verify function has the exact same inputs and 
  // return values as a vanilla passport strategy
  verify(req, username, password, done) {
    // do your custom stuff. You can call internal Verifier methods
    // and reference this.app and this.options. This method must be implemented.

    const data = { 
      issuedAt: 1530387288,
      expireAt: 1530390888,
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IkI2ZmMi.8XaOR_Rm_tt5Nicl3JxN4egK5Pnl-izTi5sgCZHTML4',
      user: 
        { userID: 1,
          username: 'emmanuel.kimando',
          email: 'emmanuel.kimando@cellulant.com',
          partnerName: 'Pewin Cabs',
          groupID: 1,
          partnerCredits: 1552 },
      permissions: 
        { credits: [ 'create', 'view', 'delete', 'update' ],
          partners: [ 'view', 'delete', 'update', 'create' ],
          shortcodes: [ 'delete', 'update', 'create', 'view' ],
          users: [ 'update', 'create', 'view', 'delete' ] } 
    }

    let {user} = data
    user.id = user.userID
    const payload = { id: user.id }

    console.log("$$$$$$$$$$$LocalVerifier user payload", user, payload);

    // the 'user' variable can be any truthy value
    // the 'payload' is the payload for the JWT access token that is generated after successful authentication
    done(null, user, payload);
  }
}



export class JWTVerifier extends AuthJWTVerifier {
  // The verify function has the exact same inputs and 
  // return values as a vanilla passport strategy
  async verify(req, payload, done) {
    // do your custom stuff. You can call internal Verifier methods
    // and reference this.app and this.options. This method must be implemented.

    // const authenticate = async ({username, password}) => {
    //   try {
    //     // get token and user profile from remote API
    //     const session = await app.service('proxyauth').create({username, password})
    //     return session
    //   } catch(error) {
    //     console.log("$$$$$$$$$$$AuthJWTVerifier authenticate error", payload, error);
    //   }
    // }
    
    // const ensureSession = async (login) => {
    //   try {
    //     const session = getAccount(login.user.userID)
    //     console.log("$$$$$$$$$$$AuthJWTVerifier ensureSession session", session);
    //     return session
    //   } catch(error) {
    //     console.log("$$$$$$$$$$$AuthJWTVerifier getAccount error", error);

    //     // if error is 401 login afresh then retry getAccount
    //     if(error.code == 401) {
    //       const session = authenticate(login)
    //       console.log("$$$$$$$$$$$AuthJWTVerifier ensureSession session", session);
    //       return session
    //     } 

    //   }

    // }

    const isExpired = (session) => {
      const diff = new Date(session.validTill) - Date.now()
      console.log("$$$$$$$$$$$AuthJWTVerifier is session Expired diff ", diff);
      return diff < 0 // 
    }
    
    // retrieve user object from jwt payload
    try {
      const session = await this.app.services.logins.get(payload.id)
      if(isExpired(session)) {        
        console.log("$$$$$$$$$$$AuthJWTVerifier session expired at ", payload, session);
        // the second param is false when verification fails
        // the 'payload' is the payload for the JWT access token that is generated after successful authentication
        return done(null, false, { message: 'Session Expired. Please login again' });
      } else {
        console.log("$$$$$$$$$$$AuthJWTVerifier session is valid");
        // the second param can be any truthy value when verification succeeds
        // the 'payload' is the payload for the JWT access token that is generated after successful authentication
        return done(null, session, payload);
      }

      return done(null, session, payload);
    } catch(error) {
      console.log("$$$$$$$$$$$AuthJWTVerifier payload error", payload, error);
      // the second param is false when verification fails
      return done(null, false, error);
    }
  }
}