module.exports = function chartDictionaryBuilder (hrefList, from_page, current_node_index, inputHandler) {
  
    const reducedHrefList = hrefList.reduce((obj, url) => { 
      if(!inputHandler.blacklistIncludes(url)) {
        obj[url] ? obj[url]++ : obj[url] = 1
      }
        return obj
    },{})

    let dictionary = []
  
    for( url in reducedHrefList) {
      dictionary.push({
        parent: from_page,
        name: url,
        size: reducedHrefList[url],
        current_node_index
      })
    }
  
    return dictionary
  }