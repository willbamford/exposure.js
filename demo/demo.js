'use strict';

var request = require('../src/lib/request.js');

// request.get('feed.json');

request.get('https://api.instagram.com/v1/media/popular?client_id=a277ac2e30d1410c8ffd84d47b510650').then(
  function (response) {
    console.log('Success:');
    console.dir(response);
  },
  function (error) {
    console.log('Error:');
    console.dir(error);
  }
);
