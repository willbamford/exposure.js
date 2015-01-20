'use strict';

require('es5-shim');

module.exports = {

  transformHeadersStringToObject: function (s) {
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
  },

  addQueryStringParamToUrl: function (url, key, value) {
    url += (url.indexOf('?') === -1) ? '?' : '&';
    url += encodeURIComponent(key) + '=' + encodeURIComponent(value);
    return url;
  }
}
