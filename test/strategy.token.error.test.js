/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Thirty7SignalsStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('using token endpoint that responds with non-standard error', function() {
    var strategy = new Thirty7SignalsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});

    // inject a "mock" oauth2 instance
    strategy._oauth2.getOAuthAccessToken = function(code, options, callback) {
      return callback({ statusCode: 400, data: '{"error":"Unsupported type: nil. Expected web_server or refresh."}' });
    };
  
    describe('handling response', function() {
      var err;
  
      before(function(done) {
        chai.passport(strategy)
          .error(function(e) {
            err = e;
            done();
          })
          .req(function(req) {
            req.query = {};
            req.query.code = 'SplxlOBeZQQYbYS6WxSbIA+ALT1';
          })
          .authenticate();
      });
  
      it('should error', function() {
        expect(err.constructor.name).to.equal('APIError');
        expect(err.message).to.equal('Unsupported type: nil. Expected web_server or refresh.');
      });
    });
  });
  
  describe('using token endpoint that responds with standard error', function() {
    var strategy = new Thirty7SignalsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});

    // inject a "mock" oauth2 instance
    strategy._oauth2.getOAuthAccessToken = function(code, options, callback) {
      return callback({ statusCode: 400, data: '{"error":"invalid_grant","error_description":"The provided value for the input parameter \'code\' is not valid."} '});
    };
  
    describe('handling response', function() {
      var err;
  
      before(function(done) {
        chai.passport(strategy)
          .error(function(e) {
            err = e;
            done();
          })
          .req(function(req) {
            req.query = {};
            req.query.code = 'SplxlOBeZQQYbYS6WxSbIA+ALT1';
          })
          .authenticate();
      });
  
      it('should error', function() {
        expect(err.constructor.name).to.equal('TokenError');
        expect(err.message).to.equal('The provided value for the input parameter \'code\' is not valid.');
        expect(err.code).to.equal('invalid_grant');
      });
    });
  });
  
});
