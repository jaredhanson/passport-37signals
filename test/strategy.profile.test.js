/* global describe, it, expect, before */
/* jshint expr: true */

var Thirty7SignalsStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  var strategy =  new Thirty7SignalsStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    },
    function() {});
  
  // mock
  strategy._oauth2.get = function(url, accessToken, callback) {
    if (url != 'https://launchpad.37signals.com/authorization.json') { return callback(new Error('wrong url argument')); }
    if (accessToken != 'token') { return callback(new Error('wrong token argument')); }
    
    var body = '{"expires_at":"2012-01-25T18:30:08Z","accounts":[{"name":"ACME Corp","href":"https://acmecorp.highrisehq.com","id":333,"product":"highrise"},{"name":"johndoe","href":"https://johndoe.backpackit.com","id":22222,"product":"backpack"},{"name":"ACME Corp","href":"https://acmecorp.basecamphq.com","id":1111111,"product":"basecamp"},{"name":"StealthBus","href":"https://stealthbus.basecamphq.com","id":1221222,"product":"basecamp"}],"identity":{"id":5555,"last_name":"Doe","email_address":"john.doe@example.com","first_name":"John"}}';
  
    callback(null, body, undefined);
  };
    
  describe('loading profile', function() {
    var profile;
    
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.provider).to.equal('37signals');
      
      expect(profile.id).to.equal('5555');
      expect(profile.displayName).to.equal('John Doe');
      expect(profile.name.familyName).to.equal('Doe');
      expect(profile.name.givenName).to.equal('John');
      expect(profile.emails[0].value).to.equal('john.doe@example.com');
    });
    
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
    
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  });
  
  describe('encountering an error', function() {
    var err, profile;
    
    before(function(done) {
      strategy.userProfile('wrong-token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
    
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
    });
    
    it('should not load profile', function() {
      expect(profile).to.be.undefined;
    });
  });
  
});
