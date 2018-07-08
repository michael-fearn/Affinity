const getBaseUrl = require('./getBaseUrl'); // PARAMS url    RETURNS base url
const pageScraper = require('./pageScraper');  // PARAMS url, baseurl   RETURNS Object with two dictionary objects
const highestOccurringUrl = require('./highestOccurringUrl') // PARAMS dictionary, type   RETURNS the highest occuring url in a dictionary
const insertLinksIntoDb = require('./insertLinksIntoDb');
const hasUrlBeenScanned = require('./hasUrlBeenScanned');

module.exports = async function domainScraper (newUrl, maxPageCount, app, firstScan = true, checkInputUrl = true, usePuppeeter = false) {
    //Check Count, break if required
  if(maxPageCount > 0 ) {
    //update Count
    maxPageCount--
  } else {
    // buildDomainDictionary();
    console.log('DONE!!!!')
    return
  }
  //Build base url
  const baseUrl = getBaseUrl(newUrl);
  let currentPage = newUrl;
  if(currentPage.endsWith('/')) {
    currentPage = currentPage.slice(0,-1)
}
  //Check to see if first page already exists in db
  if(checkInputUrl) {
    checkInputUrl = false;
    let scanResults = await hasUrlBeenScanned(newUrl,app);
    //if the page has been scanned, get the most popular unscanned page from the same domain
    if(scanResults) {
     // currentPage = await highestOccurringUrl(app, baseUrl);
    }
  }

  //Run Page Scraper
  let pageScraperResponse = await pageScraper(currentPage, baseUrl, usePuppeeter)
  
  let newPageDictionary = pageScraperResponse[0];
  usePuppeteer = pageScraperResponse[1];
  
  // Add Domain to db on first scan
  if(firstScan) {
    try {
      await app.get('db').addSite([baseUrl])
    } catch(error) {
      console.log(error)
    }
  }
  let nextUrl = ''

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
  // } catch(error) {
  //     console.log(error)
  // }

  // // add page to db
  // app.get('db').addPage([(baseUrl), currentPage, Date.now()])
  //   .then( () => {
  //     console.log('start inserting')
  //       // then add links associated with that page
  //     insertLinksIntoDb( currentPage, newPageDictionary, app)  
  //   })
  //   .then( () =>{
  //     // get most popular link from db
  //   nextUrl = highestOccurringUrl(app, baseUrl)
  // })
  // .catch( err => console.log(err))
    

   domainScraper( nextUrl, maxPageCount, app, usePuppeeter);
}