'use strict';

var Exposure = require('../src/exposure.js');

describe('create', function () {

  it('should create new instance', function () {
    var instance = Exposure.create();
    expect(instance).toBeInstanceOf(Exposure);
  });

});
