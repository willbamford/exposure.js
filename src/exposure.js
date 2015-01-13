(function (definition) {
  'use strict';

  // CommonJS
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = definition();
  // AMD / RequireJS
  } else if (typeof define === 'function' && define.amd) {
    define(definition);
  // Global
  } else if (typeof self !== 'undefined') {
    self.Exposure = definition();
  // ?
  } else {
    throw new Error('Execution environment unknown, please file a bug.');
  }
} (function () {

  'use strict';

  var Exposure = function () {
    console.log('Creating exposure instance!');
  };

  Exposure.create = function () {
    return new Exposure();
  };

  return Exposure;

}));
