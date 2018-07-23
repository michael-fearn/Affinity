module.exports = async function insertLinksIntoDb (dictionary, dbConn) {
    // break dictionary into pairs into an array of arrays containing the pairs
    // const linksArray = Object.entries(dictionary);
// INSERT INTO link (from_page, to_page, current_node_index, count)
    await dictionary.forEach( (link) => {
       dbConn.add_link([link.parent, link.name, link.current_node_index, link.size])
        .catch((err) =>{console.log(err)})
    })
}