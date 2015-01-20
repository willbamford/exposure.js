'use strict';

require('es5-shim');
var utils = require('./utils.js');
var Promise = require('es6-promise').Promise;

module.exports = {
  
  get: function (url, opts) {
    
    opts = opts || {};
    var type = opts.type || 'json';
    var transform = opts.transform || noTransform;
    
    return (type === 'json') ?
      getXhr(url, type, transform) :
      getJsonp(url, transform);
  }
};

var OK = 200;
var REQUEST_TIMEOUT = 408;

function noTransform(v) { return v; };

function getXhr(url, type, transform) {
    
  return new Promise(function (resolve, reject) {
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        
        var data = xhr.responseText;
        var response = {
          code: xhr.status,
          headers: utils.transformHeaders(xhr.getAllResponseHeaders()),
          data: (type === 'json' ? JSON.parse(data) : data)
        };
        
        response = transform(response, type);
        response.code === OK ? resolve(response) : reject(response);
      }
    };

    xhr.open('GET', url, true);
    xhr.send();
  });
}

var getJsonpCount = 0;
var getJsonp = function (url, transform) {
  
  var key = 'callback';
  var name = 'jsonpExposure' + (++getJsonpCount);
  var timeout = 10000;  
  url = utils.addQueryStringParamToUrl(url, key, value);
  var timeoutTrigger = setTimeout(function () {
    window[name] = function () {};
    callback({
      code: REQUEST_TIMEOUT,
      headers: {},
      data: {}
    });
  }, timeout);

  window[name] = function (data) {
    clearTimeout(timeoutTrigger);
    var response = {
      code: OK,
      headers: {},
      data: data
    };
    response = transform(response, 'jsonp');
    response.code === OK ? resolve(response) : reject(response);
  };

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};
