module.exports =  function inputFilterFactory(){
    
    let hrefState = {
        scanned:{},
        unscanned: {}
    }

    return {
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

        moveToBlacklist : function(inputUrl) {
            hrefState.scanned[inputUrl.toPage] = hrefState.unscanned[inputUrl.toPage]
            delete hrefState.unscanned[inputUrl.toPage]

        },

        blacklistIncludes: function(inputUrl) {
            if(hrefState.scanned[inputUrl]) {
                return true
            }
            return false;
        }

    }

}