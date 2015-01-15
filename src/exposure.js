'use strict';

require('es5-shim');
require('es6-promise').polyfill();

var uuid = 0;

module.exports = Exposure;

function Exposure(opts) {

  uuid += 1;

  var exposure = Object.create({

    init: function () {
      this.uuid = uuid;
      this.opts = opts;
      return this;
    },

    login: function () {

    },

    logout: function () {

    }

  });

  return exposure.init();
}
