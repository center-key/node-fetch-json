# node-fetch-json
_A very thin wrapper around node-fetch just for JSON_

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/node-fetch-json/blob/master/LICENSE.txt)
&nbsp;
[![npm](https://img.shields.io/npm/v/node-fetch-json.svg)](https://www.npmjs.com/package/node-fetch-json)
&nbsp;
[![Known Vulnerabilities](https://snyk.io/test/github/center-key/node-fetch-json/badge.svg)](https://snyk.io/test/github/center-key/node-fetch-json)
&nbsp;
[![Build Status](https://travis-ci.org/center-key/node-fetch-json.svg)](https://travis-ci.org/center-key/node-fetch-json)

Why would you fetch anything but JSON? ;)

### A) Setup
Install with the command:
```shell
$ npm install node-fetch-json --save
```
Then import with the line:
```javascript
const fetchJson = require('node-fetch-json');
```

### B) Usage
**node-fetch-json** depends on and calls **[node-fetch](https://www.npmjs.com/package/node-fetch)**.

#### 1. The low-level way
**node-fetch** enables you to send and receive JSON at a REST endpoint using:
```javascript
const fetch = require('node-fetch');
const options = {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
   body: JSON.stringify({ action: 'fetch', animal: 'dog' })
   };
function handleData(data) {
   console.log(data);
   }
fetch('https://httpbin.org/post', options)
   .then(response => response.json())
   .then(handleData)
   .catch(console.error);
```

#### 2. A more concise way
With **node-fetch-json**, the above becomes:
```javascript
const fetchJson = require('node-fetch-json');
function handleData(data) {
   console.log(data);
   }
fetchJson.post('https://httpbin.org/post', { action: 'fetch', animal: 'dog' })
   .then(handleData)
   .catch(console.error);
```

#### 3. Equivalent results
The two examples produce the same output.

### C) Details
The **node-fetch-json** module:
1. Automatically adds the JSON data type (`'application/json'`) to the HTTP headers.
1. Automatically serializes the body payload with `JSON.stringify()`.
1. Automatically runs `.json()` on the response from the promise.

The format for using **node-fetch-json** is:
```javascript
fetchJson.get(url[, options]).then(callback);
fetchJson.post(url, body[, options]).then(callback);
```
The `options` parameter is passed through to **node-fetch**.
See the documentation for the **[node-fetch](https://www.npmjs.com/package/node-fetch)** project.

### D) Questions or enhancements
Feel free to submit an [issue](https://github.com/center-key/node-fetch-json/issues).

---
[MIT License](LICENSE.txt)
