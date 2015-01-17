'use strict';

require('es5-shim');
var Promise = require('es6-promise').Promise;

module.exports = {
  
  get: function (url) {
    
    return new Promise(function (resolve, reject) {
      
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject({
              code: xhr.status,
              message: xhr.responseText || 'No message'
            });
          }
        }
      };
      
      xhr.open('GET', url, true);
      xhr.send();
    });
  }
  
};
