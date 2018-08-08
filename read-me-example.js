// Run program:
//    $ node read-me-example.js
//    POST https://httpbin.org/post { action: 'fetch', animal: 'dog' }
//    OLD: node-fetch -->      107.199.205.61 { action: 'fetch', animal: 'dog' }
//    NEW: node-fetch-json --> 107.199.205.61 { action: 'fetch', animal: 'dog' }

////////////////////////////////////////////////////////////////////////////////////////////////////
function oldWay() {
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
      console.log('OLD: node-fetch -->     ', data.origin, data.json);
      // console.log(data);
      }
   fetch('https://httpbin.org/post', options)
      .then(response => response.json())
      .then(handleData)
      .catch(console.error);
   }

////////////////////////////////////////////////////////////////////////////////////////////////////
function newWay() {
   const fetchJson = require('./node-fetch-json.js');
   // const fetchJson = require('node-fetch-json');
   function handleData(data) {
      console.log('NEW: node-fetch-json -->', data.origin, data.json);
      // console.log(data);
      }
   fetchJson.post('https://httpbin.org/post', { action: 'fetch', animal: 'dog' })
      .then(handleData)
      .catch(console.error);
   }

////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('POST', 'https://httpbin.org/post', { action: 'fetch', animal: 'dog' });
oldWay();
newWay();
