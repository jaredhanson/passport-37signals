# Passport-37signals

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with 37signals using the OAuth 2.0 API.

## Installation

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
      passport.authenticate('37signals'),
      function(req, res){
        // The request will be redirected to 37signals for authentication, so
        // this function will not be called.
      });

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

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
