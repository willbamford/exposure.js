'use strict';

require('es5-shim');
require('es6-promise').polyfill();

var Exposure = function () {
  // console.log('Creating exposure instance!');
};

Exposure.create = function () {
  return new Exposure();
};

module.exports = Exposure;
