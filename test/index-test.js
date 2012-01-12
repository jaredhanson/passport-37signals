var vows = require('vows');
var assert = require('assert');
var util = require('util');
var thiry7signals = require('passport-37signals');


vows.describe('passport-37signals').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(thiry7signals.version);
    },
  },
  
}).export(module);
