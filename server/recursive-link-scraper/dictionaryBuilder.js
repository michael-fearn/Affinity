module.exports = function dictionaryBuilder (hrefList, from_page, current_node_index, inputHandler) {
  
  const reducedHrefList = hrefList.reduce((obj, url) => { 
      if(!inputHandler.blacklistIncludes(url) || !inputHandler.whiteListIncludes(url)) {
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
  // for( url in reducedHrefList) {
  //   dictionary.push({
  //     from_page,
  //     to_page: url,
  //     count: reducedHrefList[url],
  //     current_node_index
  //   })
  }
  console.log('unique urls added',Object.keys(dictionary).length)
  return dictionary
}