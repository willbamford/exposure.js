'use strict';

var utils = require('../../src/lib/utils.js');

describe('utils', function () {

  describe('addQueryStringParamToUrl', function () {

    it('should create a new query string section', function () {
      var url = utils.addQueryStringParamToUrl('http://www.example.com/path', 'a-key', 'a-value');
      expect(url).toEqual('http://www.example.com/path?a-key=a-value');
    });
    
    it('should append to an existing query string section', function () {
      var url = utils.addQueryStringParamToUrl('http://www.example.com/path?foo=bar', 'a-key', 'a-value');
      expect(url).toEqual('http://www.example.com/path?foo=bar&a-key=a-value');
    });
  });
});
