'use strict';

require('es5-shim');

var modules = {}; // Service modules

var p = {
  
  init: function (opts) {
    
    var self = this;
    opts = opts || {};
    
    Object.keys(modules).forEach(function (id) {
      if (opts[id])
        self[id] = modules[id].create(opts[id]);
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
