module.exports =  function inputHandlerFactory(){
    
    let hrefState = {
        scanned:{},
        unscanned: {}
    }

    return {
        currentCountForUrl: function(inputUrl)  {
            if(hrefState.unscanned[inputUrl]) {
                return hrefState.unscanned[inputUrl]
            }
        },

        addToLists: function(hrefList) {

            hrefList.reduce( (hrefState, url) => {

                if(hrefState.scanned[url]) {
                    hrefState.scanned[url]++
                    return hrefState
                }

                hrefState.unscanned[url] ? hrefState.unscanned[url]++ : hrefState.unscanned[url] = 1
                return hrefState
                
            },hrefState)
        },

        moveToBlacklist: function(inputUrl) {

            if(!hrefState.unscanned[inputUrl]) {
                hrefState.unscanned[inputUrl] = 1
            }
            hrefState.scanned[inputUrl] = hrefState.unscanned[inputUrl]
            delete hrefState.unscanned[inputUrl]

        },

        blacklistIncludes: function(inputUrl) {
            if(hrefState.scanned[inputUrl]) {
                return true
            }
            return false
        },

        whiteListIncludes: function(inputUrl) {
            if(hrefState.unscanned[inputUrl]) {
                return true
            }
            return false
        },

        // DEBUG TOOLS
        listLength: function() {
            return Object.keys(hrefState.scanned).length + Object.keys(hrefState.unscanned).length
        }
    }

}