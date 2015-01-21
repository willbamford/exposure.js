'use strict';

var utils = require('../../src/lib/utils.js');

describe('utils', function () {

  describe('transformHeaders', function () {
    it('should transform a header string into a dictionary', function () {
      expect(utils.transformHeaders('Header-1: Value-1\r\n Header-2: Value:A:B:C'))
        .toEqual({
              'Header-1': 'Value-1',
              'Header-2': 'Value:A:B:C'
        });
    });
  });

  describe('addQueryStringParamToUrl', function () {

    it('should add a query string separator (?) before key-value', function () {
      var url = utils.addQueryStringParamToUrl('http://www.example.com/path', 'a-key', 'a-value');
      expect(url).toEqual('http://www.example.com/path?a-key=a-value');
    });
    
    it('should add a param separate (&) before key-value', function () {
      var url = utils.addQueryStringParamToUrl('http://www.example.com/path?foo=bar', 'a-?-key', 'a value');
      expect(url).toEqual('http://www.example.com/path?foo=bar&a-%3F-key=a%20value');
    });
  });
});
