const Axios = require('axios');
const fs = require('fs')
const linkScraper = require('./linkScraper');
const buildPageDictionary = require('./buildPageDictionary');


module.exports = async function pageScraper ( url, baseUrl, usePuppeteer ) {
  // initial value for response in the case puppeteer needs to be used
  let response = '';

  if (!usePuppeteer){
    try {
      response = await Axios.get(url)
    } catch(error) {
      console.log("404");
    } 
  }
  
  // Remove backslash from baseUrl for concatination 
  baseUrl = baseUrl.slice(0, baseUrl.length-1)
  
  let linkScraperResponse = await linkScraper(response.data, url, baseUrl, usePuppeteer)
  if(linkScraperResponse[0][0]){
   console.log("Page scrapped")
  }  
  //Link Scrapper returns an array with two indexes, 0 being the href list, 1 a boolean the states if puppeteer needs to be used
  let hrefArray = linkScraperResponse[0];
  usePuppeteer = linkScraperResponse[1];
  
  let dictionary = await buildPageDictionary(hrefArray, baseUrl)
  //console.log(dictionary)
  return [dictionary, usePuppeteer]  
}