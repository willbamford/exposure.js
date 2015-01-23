'use strict';

module.exports = {
    
  id: 'facebook',
  
  create: function (clientId) {
    this.clientId = clientId;
    return this;
  },
  
  login: function () { /* */ }
  
};
