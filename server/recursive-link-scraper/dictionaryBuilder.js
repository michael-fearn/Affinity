module.exports = function dictionaryBuilder (hrefList, fromPage, currentNodeIndex) {
  
  const reducedHrefList = hrefList.reduce((obj, url) => { 
      obj[url] ? obj[url]++ : obj[url] = 1
      return obj
  },{})

  let dictionary = []

  for( url in reducedHrefList) {
    dictionary.push({
      fromPage,
      toPage: url,
      count: reducedHrefList[url],
      currentNodeIndex
    })
  }

  return dictionary
}