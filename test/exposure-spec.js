'use strict';

var Exposure = require('../src/exposure.js');

describe('Exposure', function () {

  describe('create', function () {

    it('should create new instance', function () {
      var exposure1 = Exposure('E1');
      var exposure2 = Exposure('E2');

      console.log(exposure1.uuid + ', ' + exposure1.opts);
      console.log(exposure2.uuid + ', ' + exposure2.opts);

      // expect(exposure1).not.toBeNull();
      // expect(exposure1).not.toBe(exposure2);
    });


  })
});
