var assert = require('chai').assert;
var ShrinkuFacade = require('./shrinkuFacade.js');

describe('constructor', function() {
  it(`sets the shrinku property to the passed parameter`, function() {
    var expectedShrinkuObject = {}; 
    var shrinkuFacade = new ShrinkuFacade(expectedShrinkuObject);
    assert.strictEqual(shrinkuFacade.shrinku, expectedShrinkuObject);
  })
});

describe(`buildNsfwWarnerFrom`, function() {
  it(`calls .shrinku.shrink and returns a Promise that calls .wrapInWarning`, function() {
    var shrinkuMock = {};
    var inputs = { url:"mockUrl" };
    var expectedOutput = "it worked";
    shrinkuMock.shrink = function mockShrink(opts) {
      assert.equal(inputs.url, opts.url);
      return new Promise(function(resolve, reject) {
        return resolve(opts);
      });
    };
    var underTest = new ShrinkuFacade(shrinkuMock);
    underTest.wrapInWarning = function mockWrapInWarning(url) {
      assert.equal(inputs.url, url);
      return new Promise(function(resolve, reject) {
        return resolve(expectedOutput);
      });
    };
    
    var warnerPromise = underTest.buildNsfwWarnerFrom(inputs.url);
    return warnerPromise.then(function assertWarnerResults(output) {
      assert.equal(expectedOutput, output);
    });
  });
});

describe(`wrapInWarning`, function() {
  it(`returns NSFW_abcdef_NSFW when given hash of abcdef`, function() {
    var underTest = new ShrinkuFacade({});
    var hash = 'abcdef';
    var output = underTest.wrapInWarning(hash);
    assert.equal('NSFW_abcdef_NSFW', output);
  });
});
describe(`unwrapWarning`, function() {
  it(`returns abcdef when given url of NSFW_abcdef_NSFW`, function() {
    var underTest = new ShrinkuFacade();
    var output = underTest.unwrapWarning('NSFW_abcdef_NSFW');
    assert.equal('abcdef', output);
  })
});
describe(`extractOriginal`, function() {
  it(`returns Promise with result.hash equal to abcdef when given url of NSFW_abcdef_NSFW`, function() {
    var shrinkuMock = {};
    shrinkuMock.unshrink = function(input) {
      return new Promise(function(resolve, reject) {
        resolve({url:input});
      });
    }
    var underTest = new ShrinkuFacade(shrinkuMock);
    var output = underTest.extractOriginal('NSFW_abcdef_NSFW')
      .then(function(result) {
        assert.equal('abcdef', result.hash);
      })
    return output;
  });
});