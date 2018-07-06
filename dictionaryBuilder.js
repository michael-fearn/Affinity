module.exports = function dictionaryBuilder ( hrefList, baseUrl ) {

    return hrefList.reduce((obj, url) => { 
       
      if(url.startsWith(baseUrl)) {
        obj.local[url] ? obj.local[url]++ : obj.local[url] = 1;
        return obj;
      }

      else {
        obj.foreign[url] ? obj.foreign[url]++ : obj.foreign[url] = 1;
        return obj;
      }

    },{
      local: {},
      foreign: {}
      })
  
  }