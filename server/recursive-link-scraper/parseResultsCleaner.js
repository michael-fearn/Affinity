function ensureEndingBackslash (input) {
    
    return input.map( href => {
        // Ensuring link string ends with /
        if(!href) {
            return
        }
        if(!href.endsWith('/')) { 
            return href + '/'
        } 
        else {
            return href
        }
    })
}

function addBaseUrl(hrefList, baseUrl) {
    
    return hrefList.map( href => {
        if(href.startsWith('/') || href.startsWith('?')) {
            // Removing extra backslash between base url and the rest of the link string 
            return baseUrl.slice(0, baseUrl.length - 1) + href 
        }
        else {
            return href
        }
    })
}

function removeBadParseResults (hrefList, baseUrl) {
    
    return hrefList
        .filter( href => {
            return  href
                    && href.startsWith('http')
                    && href !== baseUrl
                    && !href.startsWith('#')  
                    && !href.startsWith(baseUrl + '#') 
                    && !href.startsWith('javascript')

        })
}

module.exports = function parseResultsCleaner (hrefList, baseUrl ) {

    const backSlashedHrefList = ensureEndingBackslash(hrefList)
    const cleanedHrefList = removeBadParseResults(backSlashedHrefList, baseUrl)
    return addBaseUrl(cleanedHrefList,  baseUrl)
}