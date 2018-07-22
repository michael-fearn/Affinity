const pageScraper = require('./pageScraper')
const dictionaryBuilder = require('./dictionaryBuilder');
const chartDictionaryBuilder = require('./chartDictionaryBuilder')
const inputHandlerFactory = require('./inputHandlerFactory')
const getBaseUrl = require('./../helpers/getBaseUrl')
const insertLinksIntoDb = require('./insertLinksIntoDb')
const stratifyDictionaryBuilder = require

module.exports = async function breadthSearch(url, maxDepth, socket, dbConn) {

    if(!url.endsWith('/')) url = url + '/'
    if(!url.startsWith('https')) {
        url = 'https' + url.slice(4)
     }
    let inputHandler = inputHandlerFactory()
    
   //let response = await dbConn.get_pages() //building blacklist from db

    socket.emit('node zero', url)

    let nodeContainer =[]
    let parentNode = [{from_page: '' , to_page: url}]
    socket.emit('scrape data', {
        parent: null,
        name: url,
        size: 0,
    })

    let currentNode = []
    let currentNodeIndex = 0
    
    
  
    for (let i = 0; i < maxDepth; i++) {
        for(let j = 0; j < parentNode.length; j++) {
            const currentUrl = parentNode[j].to_page
            // Logic to determine whether or not a page has been scanned previously. If It has been, skip it.
            if (!inputHandler.blacklistIncludes(currentUrl)) {
               
                const hrefList = await pageScraper(currentUrl)
                
                inputHandler.moveToBlacklist(currentUrl)
                inputHandler.addToLists(hrefList)
                
                const pageDictionary = dictionaryBuilder(hrefList, currentUrl, currentNodeIndex, inputHandler)
                const chartDictionary = chartDictionaryBuilder(hrefList, currentUrl, currentNodeIndex, inputHandler)
                currentNode = [...currentNode, ...pageDictionary];
                
                // try {
                //     await dbConn.add_domain(getBaseUrl(currentUrl))
                // } catch(error) {
                //     console.log("domain exists")
                // }
                // try {
                //     await dbConn.add_page([getBaseUrl(currentUrl), currentUrl, Date.now()])
                // } catch(error) {
                //     console.log("page exists")
                // }
                // try {
                //     await insertLinksIntoDb(pageDictionary,dbConn)
                // } catch (error) {
                //     console.log("page/link pair exists") 
                // }
                //console.log(chartDictionary)
                console.log("listlength" ,inputHandler.listLength())
                socket.emit('scrape data', chartDictionary)

    
                
                console.log("Scanning Page: ", currentUrl)
                console.log('maxDepth: ', maxDepth, 'depth: ', currentNodeIndex , "|  position in currentNode: ", j+1, "|  currentNode length: ", parentNode.length, "|  childNode:", currentNode.length)
                
            }
        }
        nodeContainer[currentNodeIndex] = parentNode;
        parentNode = currentNode
        currentNode = []
        currentNodeIndex++
        console.log(('end of node'))
        socket.emit('end of node')
    }
    console.log('done')
}