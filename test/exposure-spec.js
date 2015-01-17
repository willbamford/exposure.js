'use strict';

var Exposure = require('../src/exposure.js');

describe('Exposure', function () {

  describe('create', function () {

    it('should create new instance', function () {
      var exposure1 = Exposure.create();
      var exposure2 = Exposure.create();
      expect(exposure1).not.toBeNull();
      expect(exposure1).not.toBe(exposure2);
    });
  });
});
