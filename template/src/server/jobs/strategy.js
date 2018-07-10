const Strategy = require('passport-custom');

module.exports = (opts) => {
  return function() {
    const app = this;
    const verifier = async (req, done) => {
      opts.userService = 'proxyauth'
      try {
        const {username, password} = req.query
        // get token and user profile from remote API
        const res = await app.service('proxyauth').create({username, password})

        if(res) {
          // store session i.e token and user profile 
          let now = new Date();
          let later = new Date(now.getTime() + 50*60000); // expires in 60 minutes
          const session = Object.assign({
            validFrom: now,
            validTill: later
          }, res.data)
          const login = await app.service('logins').create(session)
          // console.log('rest strategy done ', username, password, login);
          console.log('rest strategy done', login, session)
          return done(null, login, { id: login.id });
        } else {
          console.log('rest strategy error', error);
          return done(error);

        }


      } catch (error) {
        console.log('rest strategy error', error);
        return done(error);
      }

    };

    // register the strategy in the app.passport instance
    app.passport.use('rest', new Strategy(verifier));
  };

};