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

    describe('json (xhr)', function () {

      it('should return a promise that is "resolved" with the response', function (done) {
        
        var responseStatus = 200;
        var contentType = 'application/json';
        var responseText = '{ "a": 1, "b": 2 }';
        
        jasmine.Ajax.stubRequest('/feed1.json').andReturn({
          status: responseStatus,
          contentType: contentType,
          responseText: responseText
        });
        
        var resolveFn = jasmine.createSpy('resolve');
        
        request.get('/feed1.json', { type: 'json' }).then(resolveFn).then(function () {
          
          expect(resolveFn).toHaveBeenCalledWith({
            code: 200,
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              a: 1,
              b: 2
            }
          });
          
          done();
        });
        
      });
      
      it('should return a promise that is "rejected" with the response', function (done) {
        
        var responseStatus = 500;
        var contentType = 'application/json';
        var responseText = '{ "error": "Whoops!" }';

        jasmine.Ajax.stubRequest('/feed2.json').andReturn({
          status: responseStatus,
          contentType: contentType,
          responseText: responseText
        });
        
        var rejectFn = jasmine.createSpy('reject');
        
        request.get('/feed2.json', { type: 'json' })
          .then(null, rejectFn)
          .then(function () {
            
            expect(rejectFn).toHaveBeenCalledWith({
              code: responseStatus,
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                error: 'Whoops!'
              }
            });
            
            done();
          }
        );
        
      });
      
      it('should be able to transform the response', function (done) {
        
        jasmine.Ajax.stubRequest('/feed3.json').andReturn({
          status: 200,
          responseText: '{ "meta": { "status": 500, "message": "Oops!" }, "data": { "some": "thing" } }'
        });
        
        var transform = function (response, type) {
          if (type === 'json' &&
            response.data && response.data.meta && response.data.meta.status
          ) {
            return {
              code: response.data.meta.status,
              data: response.data.data || {}
            };
          }
          return response;
        };
        
        var rejectFn = jasmine.createSpy('reject');
        
        request.get('/feed3.json', { type: 'json', transform: transform })
          .then(null, rejectFn)
          .then(function () {
            expect(rejectFn).toHaveBeenCalledWith({
              code: 500,
              data: {
                some: 'thing'
              }
            });
            done();
          });
      });
      
    });
  });
});
