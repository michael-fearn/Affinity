module.exports = function dictionaryBuilder (hrefList, from_page, current_node_index) {
  
  const reducedHrefList = hrefList.reduce((obj, url) => { 
      obj[url] ? obj[url]++ : obj[url] = 1
      return obj
  },{})

  let dictionary = []

  for( url in reducedHrefList) {
    dictionary.push({
      from_page,
      to_page: url,
      count: reducedHrefList[url],
      current_node_index
    })
  }

  return dictionary
}