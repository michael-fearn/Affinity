const express = require('express');
const app = express();
const massive = require('massive');
require('dotenv').config();

massive(process.env.CONNECTION_STRING)
  .then( db => {
    app.set('db', db);
    console.log('db connection established')
  })

app.listen(3009, () => console.log(`listening on 3009`))



const domainScraper = require('./domainScraper');

setTimeout(() => testContainer('https://www.reddit.com/'), 2500)

async function testContainer(url) {
  domainScraper(url, 50, app, false, true, true)
}