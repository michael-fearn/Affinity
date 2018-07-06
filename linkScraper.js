const cheerio = require('cheerio');
const puppetScraper = require('./puppetScraper');

module.exports = async function linkScraper ( html, url, baseUrl ) {
    
    const $ = cheerio.load(html)
    let hrefList = [];

    $('a').each( (i, element) => hrefList[i] = $(element).attr().href);
    // if empty array results of scrape, employ puppeteer method
    if(!hrefList[0]) {
     hrefList = await puppetScraper(url);
    }

    return hrefList.filter( url => !url.startsWith('#') && url  ).map( url => url.startsWith('/') || url.startsWith('?')? baseUrl + url : url  )
  } 