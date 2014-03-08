var Thirty7SignalsStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  var strategy = new Thirty7SignalsStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    },
    function() {});
    
  it('should be named 37signals', function() {
    expect(strategy.name).to.equal('37signals');
  });
  
});
