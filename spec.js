// Mocha Specification Cases

const assert =    require('assert');
const fetchJson = require('./node-fetch-json.js');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Module node-fetch-json', () => {

   it('loads as an object', () => {
      const actual =   typeof fetchJson;
      const expected = 'object';
      assert.equal(actual, expected);
      });

   it('has both get() and post() functions', () => {
      const actual =   { get: typeof fetchJson.get, post: typeof fetchJson.post };
      const expected = { get: 'function',           post: 'function' };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('fetchJson.get() response from GETing books about "JSON" from Google Books API', () => {

   it('has the correct "kind" set', (done) => {
      const url = 'https://www.googleapis.com/books/v1/volumes?q=json';
      function handleData(data) {
         const actual =   { kind: data.kind };
         const expected = { kind: 'books#volumes' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.get(url).then(handleData);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Response from POSTing a planet (object literal) to httpbin.org', () => {

   it('contains the planet (JSON)', (done) => {
      const url = 'https://httpbin.org/post';
      const resource = { position: 5, name: 'Jupiter' };
      function handleData(data) {
         const actual =   { planet: data.json, type: typeof data.json };
         const expected = { planet: resource,  type: 'object' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.post(url, resource).then(handleData);
      });

   });
