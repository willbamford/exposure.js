'use strict';

require('es5-shim');

var uuid = 0;

module.exports = {

  create: function (opts) {
    
    return Object.create({
      
      init: function () {
        this.uuid = uuid;
        this.opts = opts;
        return this;
      },
  
      login: function () {
  
      },
  
      logout: function () {
  
      }
  
    }).init();
  }
};
