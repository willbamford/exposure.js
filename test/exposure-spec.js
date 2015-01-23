'use strict';

var Exposure = require('../src/exposure.js');

var modules = {

  Friendface: {
    id: 'friendface',
    create: function (clientId) {
      return {clientId: clientId};
    }
  },

  Twinner: {
    id: 'twinner',
    create: function (clientId) {
      return {clientId: clientId};
    }
  },

  DoodlePlus: {
    id: 'doodlePlus',
    create: function (clientId) {
      return {clientId: clientId}
    }
  }

};

describe('Exposure', function () {

  describe('addModule / getModule', function () {
    
    it('should be able to register and fetch a (service) module', function () {      
      Exposure.addModule(modules.Friendface).addModule(modules.Twinner);
      expect(Exposure.getModule('friendface')).toBe(modules.Friendface);
      expect(Exposure.getModule('twinner')).toBe(modules.Twinner);
      Exposure.removeModules();
      expect(Object.keys(Exposure.modules).length).toEqual(0);
    });
    
  });

  describe('create', function () {

    beforeEach(function () {
      Exposure
        .addModule(modules.Friendface)
        .addModule(modules.Twinner)
        .addModule(modules.DoodlePlus);
    });
    
    afterEach(function () {
      Exposure.removeModules();
    });

    it('should create a new instance', function () {
      var x1 = Exposure.create();
      var x2 = Exposure.create();
      expect(x1).not.toBeNull();
      expect(x1).not.toBe(x2);
    });
    
    it('should be possible to set the OAuth redirect URL', function () {
      var x = Exposure.create();
      expect(x.redirectUri).toBe(window.location.href);
      
      x = Exposure.create({ redirectUri: 'http://www.example.com/oauth' });
      expect(x.redirectUri).toEqual('http://www.example.com/oauth');
    });
    
    it('should set client IDs for services', function () {
      
      var x = Exposure.create(
        null,
        {
          friendface: 'friendface-client-id',
          doodlePlus: 'doodle-plus-client-id',
          moduleDoesNotExist: 'module-does-not-exist'
        }
      );
      
      expect(x.friendface.clientId).toBe('friendface-client-id');
      expect(x.services.friendface.clientId).toBe('friendface-client-id');
      
      expect(x.doodlePlus.clientId).toBe('doodle-plus-client-id');
      expect(x.services.doodlePlus.clientId).toBe('doodle-plus-client-id');
      
      expect(x.moduleDoesNotExist).toBe(undefined);
      expect(x.services.moduleDoesNotExist).toBe(undefined);
      
      expect(x.twinner).toBe(undefined);
      expect(x.services.twinner).toBe(undefined);
    });
  
  });
  
});
