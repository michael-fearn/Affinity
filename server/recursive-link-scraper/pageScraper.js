const puppeteerParseMethod = require('./puppeteerParseMethod')
const httpGetParseMethod = require('./httpGetParseMethod')

module.exports = async function pageScraper(pageUrl, puppeteerOnly) {

    if( !pageUrl.endsWith('/')) {
        pageUrl = pageUrl + '/'
    }

    if(puppeteerOnly) {
        return await puppeteerParseMethod(pageUrl)
    }
    
    let hrefList = await httpGetParseMethod(pageUrl)
        
    if(!hrefList || !hrefList[0]) {
        hrefList =  await puppeteerParseMethod(pageUrl)
    }

    return hrefList
}
