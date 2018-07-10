const pageScraper = require('./pageScraper')
const getBaseUrl = require('./getBaseUrl'); // PARAMS url    RETURNS base url

module.exports = async function dbSeeder (url, app) {
    const domainSeed = getBaseUrl(url);
    const dictionary = await pageScraper(url, domainSeed);
    // break key value pairs into an array of arrays containing the pairs
    const seedLinks = Object.entries(dictionary[0]);
   console.log(seedLinks)
   //console.log(new Date().getTime()
   // input array order [domain, url of scanned page, time of scan in milliseconds])
     seedLinks.forEach( (element) => {
       app.get('db').dbLinkSeeder([ url , ...element])
        .catch(err => console.error(err))
    })



}