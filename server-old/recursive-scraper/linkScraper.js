const cheerio = require('cheerio');
const puppetScraper = require('./puppetScraper');

module.exports = async function linkScraper ( html, url, baseUrl, usePuppeteer ) {
    
  let hrefList = [];

  if(usePuppeteer) {
    console.log("using puppeteer")
    hrefList = await puppetScraper(url);
    
    if(!hrefList[0]) {
      console.log("puppeteer failed to find links")
      return
      } 
  } else {
    // if axios returns an error return
    if (!html) {
      return [[], false]
    }
    
    const $ = cheerio.load(html)

    // Loop through the a tags of the input html and add the href attribute from each a tag to the hrefList array
    $('a').each( (i, element) => hrefList[i] = $(element).attr().href);
    // if empty array results of scrape, employ puppeteer method
    if(!hrefList[0]) {
      console.log("Get request failed to return html")

      hrefList = await puppetScraper(url);

      usePuppeteer = true;
    }
  }

  // Remove falsy values and references to different parts of the same page
  const cleanedHrefList = hrefList.filter( href => href && !href.startsWith('#')  && !href.startsWith(url + '#') && !href.startsWith('javascript'))
  const formattedHrefList = cleanedHrefList
    .map( url => url.startsWith('/') || url.startsWith('?') ? baseUrl + url : url  )
    .map( url => !url.endsWith('/') ? url + '/' : url)

  return [formattedHrefList, usePuppeteer]
  } 