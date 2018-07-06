const Axios = require('axios');
const fs = require('fs')
const linkScraper = require('./linkScraper');
const dictionaryBuilder = require('./dictionaryBuilder');


module.exports = async function pageScraper ( url, baseUrl ) {

  let response =  await Axios.get(url)
  let hrefArray = await linkScraper(response.data, url, baseUrl)
  let dictionary = await dictionaryBuilder(hrefArray, baseUrl)
  console.log(dictionary)
  //return dictionary  
}