'use strict';

var Exposure = require('../../src/exposure.js');
var Facebook = require('../../src/modules/facebook.js');

describe('Facebook', function () {

  beforeEach(function () {
    Exposure.addModule(Facebook);
  });
  
  afterEach(function () {
    Exposure.removeModules();
  });

  it('should register the module', function () {
    expect(Facebook).not.toBe(undefined);
    expect(Exposure.getModule('facebook')).toBe(Facebook);
  });
  
  it('should create an instance with client ID', function () {    
    var x = Exposure.create(null, {'facebook': 'xxx-111-yyy'});
    expect(x.facebook.clientId).toEqual('xxx-111-yyy');  
  });
  
  // it('should login and obtain an OAuth 2 access token', function () {
  //   
  //   var x = Exposure.create(null, {
  //     'facebook': 'some-client-id'
  //   });
  //   
  //   x.login().then(function () {
  //     
  //     console.log('Logged in!');
  //     
  //   });
  //   
  // });
  
});
