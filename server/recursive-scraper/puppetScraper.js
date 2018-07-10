const puppeteer = require('puppeteer') ;

module.exports = async function puppetScraper(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const results = await page.evaluate( ()  => Array.from(document.links).map(e => e.href));
    
    await browser.close();
    return results;
}