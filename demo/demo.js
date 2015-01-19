'use strict';

var request = require('../src/lib/request.js');

// request.get('feed.json');

var url = 'https://www.googleapis.com/plus/v1/people/userId';

request.get(url, { type: 'json' }).then(
  function (response) {
    console.log('Success:');
    console.dir(response);
  },
  function (error) {
    console.log('Error:');
    console.dir(error);
  }
);
