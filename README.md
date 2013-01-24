# Passport-37signals

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [37signals](http://37signals.com/) using the OAuth 2.0 API.

This module lets you authenticate using 37signals in your Node.js applications.
By plugging into Passport, 37signals authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-37signals

## Usage

#### Configure Strategy

The 37signals authentication strategy authenticates users using a 37signals
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

    passport.use(new Thirty7SignalsStrategy({
        clientID: THIRTY7SIGNALS_CLIENT_ID,
        clientSecret: THIRTY7SIGNALS_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/37signals/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ thirty7signalsId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'37signals'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/37signals',
      passport.authenticate('37signals'));

    app.get('/auth/37signals/callback', 
      passport.authenticate('37signals', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaredhanson/passport-37signals/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-37signals.png)](http://travis-ci.org/jaredhanson/passport-37signals)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
