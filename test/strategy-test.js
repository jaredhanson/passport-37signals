var vows = require('vows');
var assert = require('assert');
var util = require('util');
var Thirty7SignalsStrategy = require('passport-37signals/strategy');


vows.describe('Thirty7SignalsStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new Thirty7SignalsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
    },
    
    'should be named 37signals': function (strategy) {
      assert.equal(strategy.name, '37signals');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new Thirty7SignalsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        var body = '{"expires_at":"2012-01-25T18:30:08Z","accounts":[{"name":"ACME Corp","href":"https://acmecorp.highrisehq.com","id":333,"product":"highrise"},{"name":"johndoe","href":"https://johndoe.backpackit.com","id":22222,"product":"backpack"},{"name":"ACME Corp","href":"https://acmecorp.basecamphq.com","id":1111111,"product":"basecamp"},{"name":"StealthBus","href":"https://stealthbus.basecamphq.com","id":1221222,"product":"basecamp"}],"identity":{"id":5555,"last_name":"Doe","email_address":"john.doe@example.com","first_name":"John"}}';
        
        callback(null, body, undefined);
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, '37signals');
        assert.equal(profile.id, '5555');
        assert.equal(profile.displayName, 'John Doe');
        assert.equal(profile.name.familyName, 'Doe');
        assert.equal(profile.name.givenName, 'John');
        assert.equal(profile.emails[0].value, 'john.doe@example.com');
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new Thirty7SignalsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        callback(new Error('something-went-wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },
  
}).export(module);
