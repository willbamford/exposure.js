'use strict';

require('es5-shim');
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
          headers: formatHeaders(xhr.getAllResponseHeaders()),
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
  
  var name = 'exposureJsonp_' + (++getJsonpCount);
  var timeout = 10000;
  url += '&' + key + '=' + name;
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

function formatHeaders(s) {
  var headers = {};
  if (s) {
    var a = s.split(/\r?\n/);
    a.forEach(function (h) {
      var i = h.indexOf(':');
      if (i !== -1) {
        var kv = [h.slice(0, i).trim(), h.slice(i + 1).trim()];
        headers[kv[0]] = kv[1];
      }
    });
  }
  return headers;
}
