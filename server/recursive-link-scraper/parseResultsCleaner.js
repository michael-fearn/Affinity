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
                    && !href.includes('#')
                    && href !== baseUrl
                    && !href.startsWith('#')  
                    && !href.startsWith(baseUrl + '#') 
                    && !href.startsWith('javascript')

        })
}

function ensureHttps (hrefList) {
    hrefList.forEach( href => {
        if(!href.startsWith('https')) {
            href = 'https' + href.slice(4)
        }

    })
    return hrefList
}

module.exports = function parseResultsCleaner (hrefList, baseUrl ) {

    const backSlashedHrefList = ensureEndingBackslash(hrefList)
    const cleanedHrefList = removeBadParseResults(backSlashedHrefList, baseUrl)
    const fullUrlHrefList = addBaseUrl(cleanedHrefList,  baseUrl)
    const httpsHrefList = ensureHttps(fullUrlHrefList)

    return httpsHrefList
}