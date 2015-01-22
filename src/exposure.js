'use strict';

require('es5-shim');

var modules = {}; // Service modules

var p = {
  
  services: {},
  
  init: function (opts) {
    
    opts = opts || {};
    var self = this;
    var services = opts.services || {};
    Object.keys(modules).forEach(function (id) {
      if (services[id]) {
        var service = modules[id].create(services[id]);
        self.services[id] = service;
        self[id] = service; // For convenience
      }
    });
    
    return this;
  }
  
};

module.exports = {

  addModule: function (module) {
    modules[module.id] = module;
    return this;
  },
  
  removeModules: function () {
    modules = {};
  },
  
  getModule: function (id) {
    return modules[id];
  },
  
  getModules: function () {
    return modules;
  },

  create: function (opts) {
    return Object.create(p).init(opts);
  }
};
