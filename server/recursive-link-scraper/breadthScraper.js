const pageScraper = require('./pageScraper')
const chartDictionaryBuilder = require('./chartDictionaryBuilder')
const inputHandlerFactory = require('./inputHandlerFactory')
const getBaseUrl = require('./../helpers/getBaseUrl')
const insertLinksIntoDb = require('./insertLinksIntoDb')


module.exports = async function breadthSearch(input, maxDepth, socket, dbConn, puppeteerOnly = false, currentNodeIndex = 0) {
    
    let nodeContainer = []
    let parentNode = []
    let cancelScan = false
    let currentNode = []
    let inputHandler = inputHandlerFactory()
    
    if(typeof input === 'string'){
        if (!input.endsWith('/')) input = input + '/'

        if (!input.startsWith('https')) {
            input = 'https' + input.slice(4)
        }
        
        socket.emit('node zero', input)

        nodeContainer = []
        parentNode = [{
            parent: '',
            name: input
        }]
        socket.emit('scrape data', [{
            parent: '',
            name: input,

        }])}

    if(typeof input === 'object') {
        console.log('setting array')
        console.log(maxDepth)
        parentNode = input
    }

    for (let i = 0; i < maxDepth; i++) {
        for (let j = 0; j < parentNode.length; j++) {
            socket.on('cancel scan', () => {
                cancelScan = true
            })
            
            if (cancelScan) {
                return
            }

            const currentUrl = parentNode[j].name
        
            if (!inputHandler.blacklistIncludes(currentUrl)) {

                const hrefList = await pageScraper(currentUrl, puppeteerOnly)

                inputHandler.moveToBlacklist(currentUrl)
                inputHandler.addToLists(hrefList)

                const chartDictionary = chartDictionaryBuilder(hrefList, currentUrl, currentNodeIndex, inputHandler)
                currentNode = [...currentNode, ...chartDictionary]

                
                try {
                    await dbConn.add_domain(getBaseUrl(currentUrl))
                } catch (error) {
                    console.log('domain exists')
                }
                try {
                    await dbConn.add_page([getBaseUrl(currentUrl), currentUrl, Date.now()])
                } catch (error) {
                    console.log("page exists")
                }
                try {
                    await insertLinksIntoDb(chartDictionary, dbConn)
                } catch (error) {
                   // console.log("parent/child pair exists")
                    console.log(error)
                }

                if(!currentNode.length) {
                    console.log(currentNode)
                    return i
                }



                socket.emit('scrape data', chartDictionary)
                console.log("Scanning Page: ", currentUrl)
                console.log('maxDepth: ', maxDepth, 'depth: ', currentNodeIndex, "|  position in currentNode: ", j + 1, "|  currentNode length: ", parentNode.length, "|  childNode:", currentNode.length)
            }
        }
        nodeContainer[currentNodeIndex] = parentNode
        parentNode = currentNode
        currentNode = []
        currentNodeIndex++
        console.log(('end of row'))
        socket.emit('end of node')
    }
    console.log('done')
}