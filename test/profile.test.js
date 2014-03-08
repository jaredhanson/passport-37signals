/* global describe, it, expect, before */
/* jshint expr: true */

var fs = require('fs')
  , parse = require('../lib/profile').parse;


describe('profile.parse', function() {
    
  describe('example profile', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/data/example.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = parse(data);
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.id).to.equal('5555');
      expect(profile.displayName).to.equal('John Doe');
      expect(profile.name.familyName).to.equal('Doe');
      expect(profile.name.givenName).to.equal('John');
      expect(profile.emails[0].value).to.equal('john.doe@example.com');
    });
  });
  
});
