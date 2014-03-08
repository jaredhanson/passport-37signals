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
  
  it('should add web_server to authorization params', function() {
    var params = strategy.authorizationParams();
    expect(params.type).to.equal('web_server');
  });
  
  it('should add web_server to token params', function() {
    var params = strategy.tokenParams();
    expect(params.type).to.equal('web_server');
  });
  
});
