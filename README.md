# node-fetch-json
_A thin wrapper around node-fetch just for JSON_

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/node-fetch-json/blob/master/LICENSE.txt)
&nbsp;
[![npm](https://img.shields.io/npm/v/node-fetch-json.svg)](https://www.npmjs.com/package/node-fetch-json)
&nbsp;
[![Known Vulnerabilities](https://snyk.io/test/github/center-key/node-fetch-json/badge.svg)](https://snyk.io/test/github/center-key/node-fetch-json)
&nbsp;
[![Build Status](https://travis-ci.org/center-key/node-fetch-json.svg)](https://travis-ci.org/center-key/node-fetch-json)

Why would you fetch anything but json? ;)

### A) Setup
Install with the command:
```shell
$ npm install node-fetch-json
```
Then import with the line:
```javascript
const fetchJson = require('node-fetch-json');
```

### B) Examples

#### HTTP GET
Fetch the NASA Astronomy Picture of the Day:
```javascript
// NASA APOD
const fetchJson = require('node-fetch-json');
const url =       'https://api.nasa.gov/planetary/apod';
const params =    { api_key: 'DEMO_KEY' };
function handleData(data) {
   console.log('The NASA APOD for today is at: ' + data.url);
   }
fetchJson.get(url, params).then(handleData);
```
#### HTTP POST
Create a resource for the planet Jupiter:
```javascript
// Create Jupiter
const fetchJson = require('node-fetch-json');
const resource =  { name: 'Jupiter', position: 5 };
function handleData(data) {
   console.log(data);  //HTTP response body as an object literal
   }
fetchJson.post('https://httpbin.org/post', resource)
   .then(handleData)
   .catch(console.error);
```

### C) Leverages node-fetch

**node-fetch-json** depends on and calls **[node-fetch](https://www.npmjs.com/package/node-fetch)**.

For comparison, the above POST example to create a planet would be done directly using **node-fetch** with the code:
```javascript
// Create Jupiter
const fetch =    require('node-fetch');
const resource = { name: 'Jupiter', position: 5 };
const options = {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
   body: JSON.stringify(resource)
   };
function handleData(data) {
   console.log(data);  //HTTP response body as an object literal
   }
fetch('https://httpbin.org/post', options)
   .then(response => response.json())
   .then(handleData)
   .catch(console.error);
```

The examples for **node-fetch-json** and **node-fetch** each produce the same output.

### D) Details
The **node-fetch-json** module automatically:
1. Serializes the body payload with `JSON.stringify()`.
1. Adds the JSON data type (`'application/json'`) to the HTTP headers.
1. Builds the URL query string from the `params` object for GET requests.
1. Runs `.json()` on the response from the promise.

The format for using **node-fetch-json** is:
#### GET
```javascript
fetchJson.get(url, params, options).then(callback);
```
#### POST
```javascript
fetchJson.post(url, resource, options]).then(callback);
```
#### PUT
```javascript
fetchJson.put(url, resource, options).then(callback);
```
#### PATCH
```javascript
fetchJson.patch(url, resource, options).then(callback);
```
#### DELETE
```javascript
fetchJson.delete(url, resource, options).then(callback);
```
Notes:
1. Only the `url` parameter is required.&nbsp;  The other parameters are optional.
1. The `params` object for `fetchJson.get()` is converted into a query string and appended to the `url`.
1. The `resource` object is turned into the body of the HTTP request.
1. The `options` parameter is passed through to **node-fetch** (see the **node-fetch** documentation for supported **[options](https://www.npmjs.com/package/node-fetch#options)**).

### E) Questions or enhancements
Feel free to submit an [issue](https://github.com/center-key/node-fetch-json/issues).

---
[MIT License](LICENSE.txt)
