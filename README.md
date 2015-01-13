# exposure.js [![Build Status](https://secure.travis-ci.org/WebSeed/exposure.js.svg?branch=master)](http://travis-ci.org/WebSeed/exposure.js)

Library for managing access to media on social networks

## Install

## API

**Modules developers:**

```js
Exposure.register('google', Google);
Exposure.register('facebook', Facebook);
Exposure.register('instagram', Instagram);
Exposure.register('flickr', Flickr);
```

**Clients:**

```js
var exposure = Exposure.create(
  {
    redirectUri: window.location.href,
    oauthProxy: 'http://example.com/oauth',
    scope: ['video', 'photos']
  },
  {
    google: {
      clientId: 'AAA-111'
    },
    facebook: {
      clientId: 'BBB-222'
    },
    instagram: {
      clientId: 'CCC-333',
      redirectUri: 'http://www.example.com/'
    }
  }
});

exposure.google.login.then(ok, error);
exposure.facebook.login.then(ok, error);

exposure.google.getMe().then(ok, error);
exposure.facebook.getMe().then(ok, error);

// google is the module instance
exposure.google.putMe();

exposure.google.logout();
exposure.facebook.logout();
```

exposure.oauth(clientId, redirectUri, oauthProxy, method = [popup|page|iframe]);
