const pageScraper = require('./pageScraper')
const dictionaryBuilder = require('./dictionaryBuilder');
const inputFilterFactory = require('./inputFilterFactory')

module.exports = async function breadthSearch1(url, maxDepth) {

    if(!url.endsWith('/')) url = url + '/'
   
    let nodeContainer =[]
    let parentNode = [{toPage: ''}]
    parentNode[0].toPage = url
    let currentNode = []
    let currentNodeIndex = 0
    
    let inputFilter = inputFilterFactory()
  
    for (let i = 0; i < maxDepth; i++) {


        for(let j = 0; j < parentNode.length; j++) {
            const currentUrl = parentNode[j].toPage
            // Logic to determine whether or not a page has been scanned previously. If It has been, skip it. 
            if (!inputFilter.blacklistIncludes(currentUrl)) {
                
                const hrefList = await pageScraper(currentUrl)
                
                inputFilter.addToLists(hrefList)
                const pageDictionary = dictionaryBuilder(hrefList, currentUrl, currentNodeIndex)
                
                currentNode = [...currentNode, ...pageDictionary];
                
                console.log("Scanning Page: ", currentUrl)
                console.log('depth: ', currentNodeIndex , "|  position in currentNode: ", j+1, "|  currentNode length: ", parentNode.length, "|  childNode:", currentNode.length)
            }
        }
        nodeContainer[currentNodeIndex] = parentNode;
        parentNode = currentNode
        currentNode = []
        maxDepth--
        currentNodeIndex++
    }
}