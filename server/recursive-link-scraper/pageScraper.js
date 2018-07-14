const puppeteerParseMethod = require('./puppeteerParseMethod')
const httpGetParseMethod = require('./httpGetParseMethod')
const dictionaryBuilder = require('./dictionaryBuilder')

module.exports = async function pageScraper(pageUrl) {

    if( !pageUrl.endsWith('/')) {
        pageUrl = pageUrl + '/'
    }

    let hrefList = await httpGetParseMethod(pageUrl)
        
    if(!hrefList) {
        hrefList =  await puppeteerParseMethod(pageUrl)
    }
   
    
   
    return hrefList
}
