const puppeteer = require('puppeteer') 
const cheerio = require('cheerio');
const parseResultsCleaner = require('./parseResultsCleaner')


module.exports = async function puppeteerParseMethod(url) {

    let rawHrefList = []
    
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    const page = await browser.newPage()

    try {
        await page.goto(url)
    } catch(error) {
        console.log("page not found")
        return []
    }
    try {
        rawHrefList = await page.evaluate( () => [...document.links].map(element => element.href))
    } catch(error) {
        console.log(error)
        await browser.close()
        return []
    }

    await browser.close()
    console.log('puppeteer success')
    return parseResultsCleaner(rawHrefList, url)
}
// ~.520s overhead to launch and end puppeteer

