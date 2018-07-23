module.exports = async function breadthDbQuery( socket, dbConn, url = '', maxNodeDepth = 2 ) {
    
    //if(!url.endsWith('/') && url) url = url + '/'
    let currentNode = []
    let currentNodeIndex = 0
    let parentNode = [{name: url}] 

    if(!url) {
        const name = await dbConn.get_random_index_zero_node()
        console.log(2222, name[0].parent)
        parentNode[0].name = name[0].parent
    } else {

    }

   // socket.emit('node zero', parentNode[0].name)
   socket.emit('scrape data', parentNode)
        //console.log(parentNode)
    for(let i = 0; i < maxNodeDepth; i++) {
       // console.log(111)
        for(let j = 0; j < parentNode.length; j++) {
            
            const currentUrl = parentNode[j].name
            const pageData = await dbConn.get_matching_from_pages(currentUrl)
            //console.log(2222, pageData)
            currentNode = [...currentNode, ...pageData]
           

            console.log("Scanning Page: ", currentUrl)
            console.log('maxDepth: ', maxNodeDepth, 'depth: ', i , "|  position in currentNode: ", j+1, "|  currentNode length: ", parentNode.length, "|  childNode:", currentNode.length)
            
            if(!currentNode[0]) {
                console.log("end of results")
                //socket.emit('end of results')
                break;
            }
            socket.emit('scrape data', pageData)
        }
        
        parentNode = currentNode
        currentNode = []
        currentNodeIndex++
    }
    console.log("end of search")
    //socket.emit('end of search')
}
