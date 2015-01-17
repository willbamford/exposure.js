'use strict';

var request = require('../../src/lib/request.js');

describe('request', function () {

  beforeEach(function () {
    jasmine.Ajax.install();
  });
  
  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  describe('get', function () {

    it('should return a promise that is "resolved" with the response', function (done) {
      
      jasmine.Ajax.stubRequest('/feed.json').andReturn({
        status: 200,
        responseText: 'The response'
      });
      var resolveFn = jasmine.createSpy('resolve');
      request.get('/feed.json').then(resolveFn).then(function () {
        expect(resolveFn).toHaveBeenCalledWith('The response');
        done();
      });
    });
    
    it('should return a promise which is "rejected" with an error object', function (done) {
      
      jasmine.Ajax.stubRequest('/another-feed.json').andReturn({
        status: 500,
        responseText: '{error: "Some message"}'
      });
      var rejectFn = jasmine.createSpy('reject');
      request.get('/another-feed.json').then(null, rejectFn).then(function () {
        expect(rejectFn).toHaveBeenCalledWith({
          code: 500,
          message: '{error: "Some message"}'
        });
        done();
      });
    });
  });
});
