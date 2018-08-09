// node-fetch-json ~~ MIT License

const fetch = require('node-fetch');

const nodeFetchJson = {
   request: function(method, url, resource, options) {
      options = Object.assign({ method: method }, options);
      const jsonHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
      options.headers = Object.assign(jsonHeaders, options.headers);
      if (resource)
         options.body = JSON.stringify(resource);
      function toJson(response) { return response.json(); }
      return fetch(url, options).then(toJson);
      },
   get: function(url, params, options) {
      function toPair(key) { return key + '=' + params[key]; }
      if (params)
         url = url + (url.includes('?') ? '&' : '?') + Object.keys(params).map(toPair).join('&');
      return nodeFetchJson.request('GET', url, null, options);
      },
   post: function(url, resource, options) {
      return nodeFetchJson.request('POST', url, resource, options);
      },
   put: function(url, resource, options) {
      return nodeFetchJson.request('PUT', url, resource, options);
      },
   patch: function(url, resource, options) {
      return nodeFetchJson.request('PATCH', url, resource, options);
      },
   delete: function(url, resource, options) {
      return nodeFetchJson.request('DELETE', url, resource, options);
      }
   };

module.exports = nodeFetchJson;
