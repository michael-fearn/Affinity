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

setTimeout(() => testContainer('https://www.compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/'), 2000)

async function testContainer(url) {
  domainScraper(url, 5, app)
}