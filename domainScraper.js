const getBaseUrl = require('./getBaseUrl');
const pageScraper = require('./pageScraper');
const highestOccurringUrl = require('./highestOccurringUrl') 
const insertLinksIntoDb = require('./insertLinksIntoDb');
const hasUrlBeenScanned = require('./hasUrlBeenScanned');

module.exports = async function domainScraper (newUrl, maxPageCount, app, usePuppeteer = false, firstScan = true , checkInputUrl = true ) {
    //Check Count, break if required
  if(maxPageCount > 0 ) {
    //update Count
    maxPageCount--
  } else {
    // buildDomainDictionary();
    console.log('Done')
    return
  }
  //Build base url
  const baseUrl = getBaseUrl(newUrl);
  let currentPage = newUrl;

  //Check to see if first page already exists in db
  if(checkInputUrl) {
    checkInputUrl = false;
    console.log(`Checking input ${currentPage}`)
    let scanResults = await hasUrlBeenScanned(newUrl,app);
    //if the page has been scanned, get the most popular unscanned page from the same domain
    if(scanResults) {
     currentPage = await highestOccurringUrl(app, baseUrl);
    }
  }
 
    if(currentPage.endsWith('/')) {
      currentPage = currentPage.slice(0,-1)
  }

  // Add Domain to db on first scan
  if(firstScan) {
    firstScan = false;
    try {
      await app.get('db').addSite([baseUrl])
    } catch(error) {
      console.log("Domain exits in site table")
    }
  }

  //Run Page Scraper
  let pageScraperResponse = await pageScraper(currentPage, baseUrl, usePuppeteer)
  
  //Link Scrapper returns an array with two indexes, 0 being the href list, 1 a boolean the states if puppeteer needs to be used
  let newPageDictionary = pageScraperResponse[0];
  usePuppeteer = pageScraperResponse[1];
  

  let nextUrl = '';

  try {
    await app.get('db').addPage([(baseUrl), currentPage + '/', Date.now()])
      } catch(error) {
      console.log(error)
  }
  try {
    await insertLinksIntoDb( currentPage, newPageDictionary, app)
  } catch(error) {
    console.log(error)
  }
  try {
    nextUrl = await highestOccurringUrl(app,baseUrl)
  } catch(error) {
    console.log(error)
  }

   domainScraper( nextUrl, maxPageCount, app, usePuppeteer, firstScan, checkInputUrl);
}