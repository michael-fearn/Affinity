const Axios = require('axios');
const cheerio = require('cheerio');


function getBaseUrl ( url ) {
  const pathArray = url.split( '/' );
  const protocol = pathArray[0];
  const host = pathArray[2];
  const baseUrl = protocol + '//' + host; 
  return baseUrl;
}



function linkScraper ( response, baseUrl ) {
  const $ = cheerio.load(response.data)
  let hrefList = [];
 
  $('a').each( (i, element) => hrefList[i] = $(element).attr().href);

  return hrefList.map( url => url.startsWith('/') || url.startsWith('#') ? baseUrl + url : url )
} 



function dictionaryBuilder ( hrefArray, baseUrl ) {

  return hrefArray.reduce((obj, url) => { 
       
      if(url.startsWith(baseUrl)) {
        obj.local[url] ? obj.local[url]++ : obj.local[url] = 1;
        return obj;
      }

      else {
        obj.foreign[url] ? obj.foreign[url]++ : obj.foreign[url] = 1;
        return obj;
      }

      },{
        local: {},
        foreign: {}
        })

}


module.exports = async function pageScraper ( url ) {

  const baseUrl = getBaseUrl(url);

  return await Axios.get(url)
      .then((response) => linkScraper(response, baseUrl))
      .then( (hrefArray) => dictionaryBuilder(hrefArray, baseUrl))
      .then( data => console.log(data))     
}


