'use strict';

var Exposure = require('../src/exposure.js');

var Friendface = {
  id: 'friendface',
  create: function (opts) {
    return {clientId: opts.clientId || ''};
  }
};

var Twinner = {
  id: 'twinner',
  create: function (opts) {
    return {clientId: opts.clientId || ''};
  }
};

var DoodlePlus = {
  id: 'doodlePlus',
  create: function (opts) {
    return {clientId: opts.clientId || ''};
  }
};

describe('Exposure', function () {

  describe('addModule / getModule', function () {
    
    it('should be able to register and fetch a (service) module', function () {      
      Exposure.addModule(Friendface).addModule(Twinner);
      expect(Exposure.getModule('friendface')).toBe(Friendface);
      expect(Exposure.getModule('twinner')).toBe(Twinner);
      Exposure.removeModules();
      expect(Object.keys(Exposure.getModules()).length).toEqual(0);
    });
    
  });

  describe('create', function () {

    beforeEach(function () {
      Exposure
        .addModule(Friendface)
        .addModule(Twinner)
        .addModule(DoodlePlus);
    });
    
    afterEach(function () {
      Exposure.removeModules();
    });

    it('should create a new instance', function () {
      var exposure1 = Exposure.create();
      var exposure2 = Exposure.create();
      expect(exposure1).not.toBeNull();
      expect(exposure1).not.toBe(exposure2);
    });
    
    it('should set client IDs for services', function () {
      
      var exposure = Exposure.create({
        services: {
          friendface: {
            clientId: 'friendface-client-id'
          },
          doodlePlus: {
            clientId: 'doodle-plus-client-id'
          },
          moduleDoesNotExist: {
            clientId: 'module-does-not-exist'
          }
        }
      });
      
      expect(exposure.friendface.clientId).toBe('friendface-client-id');
      expect(exposure.services.friendface.clientId).toBe('friendface-client-id');
      
      expect(exposure.doodlePlus.clientId).toBe('doodle-plus-client-id');
      expect(exposure.services.doodlePlus.clientId).toBe('doodle-plus-client-id');
      
      expect(exposure.moduleDoesNotExist).toBe(undefined);
      expect(exposure.services.moduleDoesNotExist).toBe(undefined);
      
      expect(exposure.twinner).toBe(undefined);
      expect(exposure.services.twinner).toBe(undefined);
    });
  });
  
  // exposure.facebook.login();
  // exposure.facebook.getAlbums();
  // exposure.google.getPhotos().then();
});
