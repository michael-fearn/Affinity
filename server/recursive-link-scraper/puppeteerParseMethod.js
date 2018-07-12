const puppeteer = require('puppeteer') 
const parseResultsCleaner = require('./parseResultsCleaner')

module.exports = async function puppeteerParseMethod(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    try {
        await page.goto(url)
    } catch(error) {
        console.log("page not found")
        return []
    }
    let hrefList
    try {
        hrefList = await page.evaluate( ()  => [...document.links].map(e => e.href))
    } catch(error) {
        console.log("something failed")
        await browser.close()
        return []
    }
        
    
    await browser.close()

    return parseResultsCleaner(hrefList, url)
}
// ~.520s overhead to launch and end puppeteer