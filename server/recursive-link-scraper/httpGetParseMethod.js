const axios = require('axios')
const cheerio = require('cheerio')
const parseResultsCleaner = require('./parseResultsCleaner')

// Rule of thumb, everything must end with / and must be removed if needed.
module.exports = async function httpGetParseMethod(url) {
    
    let response;

    try {
        response = await axios.get(url)
    } catch(err) {
        console.log("page not found")
        return []
    }

    const $ = cheerio.load(response.data)

    let hrefList = []

    $('a').each( (i, element) => hrefList[i] = $(element).attr().href )

    if(!hrefList[0]) {
        console.log("http get parse failed, using puppeteer")
        return
    }
    
      return parseResultsCleaner(hrefList, url)
}