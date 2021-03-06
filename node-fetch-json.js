// node-fetch-json ~~ MIT License

const fetch = require('node-fetch');

const nodeFetchJson = {
   request: function(method, url, data, options) {
      const settings = { method: method.toUpperCase() };
      options = Object.assign(settings, options);
      const jsonHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
      options.headers = Object.assign(jsonHeaders, options.headers);
      function toPair(key) { return key + '=' + encodeURIComponent(data[key]); }
      if (options.method === 'GET' && data)
         url = url + (url.includes('?') ? '&' : '?') + Object.keys(data).map(toPair).join('&');
      else if (options.method !== 'GET' && data)
         options.body = JSON.stringify(data);
      function toJson(response) {
         const contentType = response.headers.get('content-type');
         const isJson = /json|javascript/.test(contentType);  //match "application/json" or "text/javascript"
         function textToObj(httpBody) {
            if (nodeFetchJson.logger)
               nodeFetchJson.logger(new Date().toISOString(), options.method, response.url,
                  response.ok, response.status, response.statusText, contentType);
            response.error =       !response.ok;
            response.contentType = contentType;
            response.bodyText =    httpBody;
            return response;
            }
         return isJson ? response.json() : response.text().then(textToObj);
         }
      if (nodeFetchJson.logger)
         nodeFetchJson.logger(new Date().toISOString(), options.method, url);
      return fetch(url, options).then(toJson);
      },
   get: function(url, params, options) {
      return nodeFetchJson.request('GET', url, params, options);
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
      },
   logger: null,
   enableLogger: function(booleanOrFn) {
      const isFn = typeof booleanOrFn === 'function';
      nodeFetchJson.logger = isFn ? booleanOrFn : booleanOrFn === false ? null : console.log;
      return nodeFetchJson.logger;
      }
   };

module.exports = nodeFetchJson;
