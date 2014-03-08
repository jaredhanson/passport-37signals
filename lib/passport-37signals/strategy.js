/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The 37signals authentication strategy authenticates requests by delegating to
 * 37signals using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your 37signals application's client id
 *   - `clientSecret`  your 37signals application's client secret
 *   - `callbackURL`   URL to which 37signals will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new Thirty7SignalsStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/37signals/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  // http://groups.google.com/group/37signals-api/browse_thread/thread/86b0da52134c1b7e
  options.authorizationURL = options.authorizationURL || 'https://launchpad.37signals.com/authorization/new';
  options.tokenURL = options.tokenURL || 'https://launchpad.37signals.com/authorization/token';

  OAuth2Strategy.call(this, options, verify);
  this.name = '37signals';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from 37signals.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `37signals`
 *   - `id`
 *   - `username`
 *   - `displayName`
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get('https://launchpad.37signals.com/authorization.json', accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

    try {
      var json = JSON.parse(body);

      var profile = { provider: '37signals' };
      profile.id = json.identity.id;
      profile.displayName = json.identity.first_name + ' ' + json.identity.last_name;
      profile.name = { familyName: json.identity.last_name,
                       givenName: json.identity.first_name };
      profile.emails = [{ value: json.identity.email_address }];

      profile._raw = body;
      profile._json = json;

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}

/**
 * Return extra parameters to be included in the authorization request.
 *
 * Adds type=web_server to params
 *
 * @param  {Object} options
 * @return {Object} params
 */
Strategy.prototype.authorizationParams = function(options) {
  return {
    type: 'web_server'
  };
};

/**
 * Return extra parameters to be included in the token request.
 *
 * Adds type=web_server to params
 *
 * @return {Object} params
 */
Strategy.prototype.tokenParams = function() {
  return {
    type: 'web_server'
  };
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
