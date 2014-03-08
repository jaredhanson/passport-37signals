/* global describe, it, expect, before */
/* jshint expr: true */

var Thirty7SignalsStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  describe('handling API errors', function() {
    var strategy =  new Thirty7SignalsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
  
    // mock
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://launchpad.37signals.com/authorization.json') { return callback(new Error('wrong url argument')); }
      if (accessToken != 'token') { return callback(new Error('wrong token argument')); }
    
      var body = '{"error":"OAuth token could not be verified. The internal checksum failed, so the token data was somehow mangled or tampered with."}';
      
      callback({ statusCode: 401, data: body });
    };
      
    var err, profile;
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('APIError');
      expect(err.message).to.equal('OAuth token could not be verified. The internal checksum failed, so the token data was somehow mangled or tampered with.');
    });
  });
  
  describe('handling malformed responses', function() {
    var strategy =  new Thirty7SignalsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
  
    // mock
    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://launchpad.37signals.com/authorization.json') { return callback(new Error('wrong url argument')); }
      if (accessToken != 'token') { return callback(new Error('wrong token argument')); }
    
      var body = 'Hello, world.';
      callback(null, body, undefined);
    };
      
    var err, profile;
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Failed to parse user profile');
    });
  });
  
});
