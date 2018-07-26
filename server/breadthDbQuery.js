module.exports = async function breadthDbQuery( socket, dbConn, url = '', maxNodeDepth = 2 ) {
    
    let currentNode = []
    let parentNode = [{name: url}] 
    let i

    if(!url) {
        const name = await dbConn.get_random_index_zero_node()
        parentNode[0].name = name[0].parent
    }

    socket.emit('node zero', parentNode[0].name)
    socket.emit('scrape data', parentNode)
    
    for(i = 0; i < maxNodeDepth; i++) {
        for(let j = 0; j < parentNode.length; j++) {
            
            const currentUrl = parentNode[j].name
            const pageData = await dbConn.get_matching_from_pages(currentUrl)
            currentNode = [...currentNode, ...pageData]
            
            console.log("Fetching Page: ", currentUrl)
            console.log('maxDepth: ', maxNodeDepth, 'depth: ', i , "|  position in currentNode: ", j+1, "|  currentNode length: ", parentNode.length, "|  childNode:", currentNode.length)
            
            if(!currentNode[0]) {
                console.log("end of results")
                //socket.emit('end of results')
                return [i, parentNode]
            }
            socket.emit('scrape data', pageData)
        }
        parentNode = currentNode
        currentNode = []
    }
    console.log("end of search")
    socket.emit('end of db search')

    return i
}
