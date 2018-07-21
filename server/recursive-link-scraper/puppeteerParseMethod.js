const puppeteer = require('puppeteer') 
const cheerio = require('cheerio');
const parseResultsCleaner = require('./parseResultsCleaner')


module.exports = async function puppeteerParseMethod(url) {
    let pageBody = {}
    let hrefList = []
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    try {
        await page.goto(url)
    } catch(error) {
        console.log("page not found")
        return []
    }
    try {
        pageBody = await page.evaluate( () => document.body.innerHTML)
    } catch(error) {
        console.log(error)
        await browser.close()
        return []
    }

    const $ = cheerio.load(pageBody)
    $('a').each( (i, element) => hrefList[i] = $(element).attr().href )
   
    await browser.close()

    return parseResultsCleaner(hrefList, url)
}
// ~.520s overhead to launch and end puppeteer

