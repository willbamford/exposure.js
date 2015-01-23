'use strict';

require('es5-shim');

var x = {
  
  services: {},
  redirectUri: undefined,
  
  init: function (opts, serviceOpts) {
    
    var self = this;
    var modules = this.modules;
    
    opts = opts || {};
    serviceOpts = serviceOpts || {};

    this.redirectUri = opts.redirectUri || window.location.href;
    Object.keys(modules).forEach(function (id) {
      if (serviceOpts[id]) {
        var service = modules[id].create(serviceOpts[id]);
        self.services[id] = service;
        self[id] = service;
      }
    });
    
    return this;
  }
  
};

module.exports = {

  modules: {},
  
  addModule: function (module) {
    this.modules[module.id] = module;
    return this;
  },
  
  getModule: function (id) {
    return this.modules[id];
  },

  removeModules: function () {
    this.modules = {};
  },

  create: function (opts, serviceOpts) {
    var instance = Object.create(x);
    instance.modules = this.modules;
    return instance.init(opts, serviceOpts);
  }
};
