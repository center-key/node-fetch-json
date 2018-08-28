// Run program:
//    $ node read-me-example.js
//    POST https://httpbin.org/post { name: 'Jupiter', position: 5 }
//    OLD: node-fetch -->      107.199.205.61 { name: 'Jupiter', position: 5 }
//    NEW: node-fetch-json --> 107.199.205.61 { name: 'Jupiter', position: 5 }

////////////////////////////////////////////////////////////////////////////////////////////////////
function oldWay() {
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
      console.log('OLD: node-fetch -->     ', data.origin, data.json);
      // console.log(data);  //HTTP response body as an object literal
      }
   fetch('https://httpbin.org/post', options)
      .then(response => response.json())
      .then(handleData)
      .catch(console.error);
   }

////////////////////////////////////////////////////////////////////////////////////////////////////
function newWay() {
   // Create Jupiter
   const fetchJson = require('./node-fetch-json.js');
   // const fetchJson = require('node-fetch-json');
   const resource =  { name: 'Jupiter', position: 5 };
   function handleData(data) {
      console.log('NEW: node-fetch-json -->', data.origin, data.json);
      // console.log(data);  //HTTP response body as an object literal
      }
   fetchJson.enableLogger();
   fetchJson.post('https://httpbin.org/post', resource)
      .then(handleData)
      .catch(console.error);
   }

////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('POST', 'https://httpbin.org/post', { name: 'Jupiter', position: 5 });
oldWay();
newWay();
