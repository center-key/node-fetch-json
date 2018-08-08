// node-fetch-json ~~ MIT License

const fetch = require('node-fetch');

const nodeFetchJson = {
   request: function(method, url, data, options) {
      options = Object.assign({ method: method }, options);
      const jsonHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
      options.headers = Object.assign(jsonHeaders, options.headers);
      if (data)
         options.body = JSON.stringify(data);
      function toJson(response) { return response.json(); }
      return fetch(url, options).then(toJson);
      },
   get: function(url, options) {
      return nodeFetchJson.request('GET', url, null, options);
      },
   post: function(url, data, options) {
      return nodeFetchJson.request('POST', url, data, options);
      },
   put: function(url, data, options) {
      return nodeFetchJson.request('PUT', url, data, options);
      },
   patch: function(url, data, options) {
      return nodeFetchJson.request('PATCH', url, data, options);
      },
   delete: function(url, data, options) {
      return nodeFetchJson.request('DELETE', url, data, options);
      }
   };

module.exports = nodeFetchJson;
