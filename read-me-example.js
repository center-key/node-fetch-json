// node read-me-example.js

const url =  'https://httpbin.org/post';
const data = { action: 'fetch', animal: 'dog' };

////////////////////////////////////////////////////////////////////////////////////////////////////
function oldWay() {
   const fetch = require('node-fetch');
   const options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
         },
      body: JSON.stringify(data)
      };
   function handleJson(reponse) {
      console.log('OLD: node-fetch -->     ', reponse.origin, reponse.json);
      }
   fetch(url, options)
      .then(response => response.json())
      .then(handleJson)
      .catch(console.error);
   }

////////////////////////////////////////////////////////////////////////////////////////////////////
function newWay() {
   const fetchJson = require('./node-fetch-json.js');
   function handleJson(reponse) {
      console.log('NEW: node-fetch-json -->', reponse.origin, reponse.json);
      }
   fetchJson(url, { method: 'POST', body: data })
      .then(handleJson)
      .catch(console.error);
   }

////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('POST', url, data);
oldWay();
newWay();
