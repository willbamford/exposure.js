'use strict';

require('es5-shim');

var modules = {}; // Service modules

var p = {
  
  services: {},
  redirectUrl: undefined,
  
  init: function (opts, serviceOpts) {
    
    var self = this;
    
    opts = opts || {};
    serviceOpts = serviceOpts || {};

    this.redirectUrl = opts.redirectUrl || window.location.href;
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

  create: function (opts, serviceOpts) {
    return Object.create(p).init(opts, serviceOpts);
  }
};
