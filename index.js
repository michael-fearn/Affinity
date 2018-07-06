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

const getBaseUrl = require('./getBaseUrl'); // PARAMS url    RETURNS base url
const pageScraper = require('./pageScraper');  // PARAMS url, baseurl   RETURNS Object with two dictionary objects
const highestOccurringUrl = require('./highestOccurringUrl') // PARAMS dictionary, type   RETURNS the highest occuring url in a dictionary

const baseUrl = getBaseUrl('https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0');
async function test () {
  let dictionary = await pageScraper('https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0', baseUrl);
  //updateDatabaseWithChanges(dictionary.local)
  return dictionary
}
test()
async function updateDatabaseWithChanges(changesDictionary) {
  
  const localChangesArray = Object.entries(changesDictionary);

  for(let i = 0; i < localChangesArray.length; i++) {
    app.get('db').newLinkEntry(localChangesArray[i])
  }
}

async function domainScraper (newUrl, maxPageCount) {
  
  if(maxPageCount > 0 ) {
    maxPageCount--
  } else {
    app.get('db').addSiteData([baseUrl])
    return
  }

  //const baseUrl = getBaseUrl(newUrl);

  console.log(maxPageCount)

  let nextUrl = highestOcurringUrl(dictionary, 'local')

  domainScraper( nextUrl, maxPageCount);
}


//mostPopularLocalUrl()