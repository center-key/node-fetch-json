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
describe('GET response returned by httpbin.org', () => {

   it('contains empty params when none are supplied', (done) => {
      const url = 'https://httpbin.org/get';
      function handleData(data) {
         const actual =   data.args;
         const expected = { };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.get(url).then(handleData);
      });

   it('contains the params from the URL query string', (done) => {
      const url = 'https://httpbin.org/get?planet=Jupiter&max=3';
      function handleData(data) {
         const actual =   data.args;
         const expected = { planet: 'Jupiter', max: '3' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.get(url).then(handleData);
      });

   it('contains the params from an object', (done) => {
      const url = 'https://httpbin.org/get';
      const parms = { planet: 'Jupiter', max: 3 };
      function handleData(data) {
         const actual =   data.args;
         const expected = { planet: 'Jupiter', max: '3' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.get(url, parms).then(handleData);
      });

   it('contains the params from both the URL query string and an object', (done) => {
      const url = 'https://httpbin.org/get?sort=diameter';
      const parms = { planet: 'Jupiter', max: 3 };
      function handleData(data) {
         const actual =   data.args;
         const expected = { sort: 'diameter', planet: 'Jupiter', max: '3' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.get(url, parms).then(handleData);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Response returned by httpbin.org for a planet (object literal)', () => {

   it('from a POST contains the planet (JSON)', (done) => {
      const url = 'https://httpbin.org/post';
      const resource = { position: 1, name: 'Mercury' };
      function handleData(data) {
         const actual =   { planet: data.json, type: typeof data.json };
         const expected = { planet: resource,  type: 'object' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.post(url, resource).then(handleData);
      });

   it('from a PUT contains the planet (JSON)', (done) => {
      const url = 'https://httpbin.org/put';
      const resource = { position: 2, name: 'Venus' };
      function handleData(data) {
         const actual =   { planet: data.json, type: typeof data.json };
         const expected = { planet: resource,  type: 'object' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.put(url, resource).then(handleData);
      });

   it('from a PATCH contains the planet (JSON)', (done) => {
      const url = 'https://httpbin.org/patch';
      const resource = { position: 4, name: 'Mars' };
      function handleData(data) {
         const actual =   { planet: data.json, type: typeof data.json };
         const expected = { planet: resource,  type: 'object' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.patch(url, resource).then(handleData);
      });

   it('from a DELETE contains the planet (JSON)', (done) => {
      const url = 'https://httpbin.org/delete';
      const resource = { position: 5, name: 'Jupiter' };
      function handleData(data) {
         const actual =   { planet: data.json, type: typeof data.json };
         const expected = { planet: resource,  type: 'object' };
         assert.deepEqual(actual, expected);
         done();
         }
      fetchJson.delete(url, resource).then(handleData);
      });

   });
