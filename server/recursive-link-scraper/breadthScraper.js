const pageScraper = require('./pageScraper')
const inputFilterFactory = require('./inputFilterFactory')
module.exports = async function breadthSearch ( maxDepth,  url = '', parentNode = [], counter = 0, hrefState = { scanned:{}, unscanned:{}}) {  
    
    if ( maxDepth > 0) {
        counter++
        maxDepth--
    }
    else {
        console.log("done")
        return
    }

    let inputFilter = inputFilterFactory()

    if (!parentNode[0]) {
         
        if(!url.endsWith('/')) url = url + '/'
        console.log("hit node 0")
        //socket.emit('node zero', url)
        console.log("Creating center node with:", url)
        //currentPageResults [dictionary, hrefList]
        const currentPageResults = await pageScraper(url)

        inputFilter.moveToBlacklist(url)
        inputFilter.addToLists(currentPageResults[1])

        parentNode = currentPageResults[0]
    }

    let currentNode = []
    
    for(let i = 0; i < parentNode.length; i++) {

        // Logic to determine whether or not a page has been scanned previously. If It has been, skip it. 
        if (!inputFilter.blacklistIncludes(parentNode[i].toPage)) {
            
            const currentPageResults = await pageScraper(parentNode[i].toPage, counter)
            currentNode = [...currentNode, ...currentPageResults[0]];

            console.log("Scanning Page: ", parentNode[i].toPage)
            console.log('depth: ', counter , "|  position in currentNode: ", i+1, "|  currentNode: ", parentNode.length, "|  childNode:", currentNode.length)
            
            inputFilter.addToLists(currentPageResults[1])
        }
    }
    //socket.emit('end of node')
    breadthSearch( maxDepth, '', currentNode, counter, hrefState)
}