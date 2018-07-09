module.exports = function buildPageDictionary ( hrefList, baseUrl ) {

  return hrefList.reduce((obj, url) => { 
      obj[url] ? obj[url]++ : obj[url] = 1;
      return obj;
  },{})

}