module.exports = async function insertLinksIntoDb (dictionary, dbConn) {
    // break dictionary into pairs into an array of arrays containing the pairs
    // const linksArray = Object.entries(dictionary);
// INSERT INTO link (from_page, to_page, current_node_index, count)
    await dictionary.forEach( (link) => {
       dbConn.add_link([link.fromPage, link.toPage, link.currentNodeIndex, link.count])
        .catch(() =>{})
    })
}