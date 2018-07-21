const puppeteerParseMethod = require('./puppeteerParseMethod')
const httpGetParseMethod = require('./httpGetParseMethod')

module.exports = async function pageScraper(pageUrl) {

    if( !pageUrl.endsWith('/')) {
        pageUrl = pageUrl + '/'
    }

     let hrefList = await httpGetParseMethod(pageUrl)
        
    if(!hrefList || !hrefList[0]) {
        hrefList =  await puppeteerParseMethod(pageUrl)
    }
   
    return hrefList
}
