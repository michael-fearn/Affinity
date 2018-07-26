module.exports = async function insertLinksIntoDb(dictionary, dbConn) {
    await dictionary.forEach((link) => {
        dbConn.add_link([link.parent, link.name, link.current_node_index, link.size])
            .catch((err) => {})
    })
}