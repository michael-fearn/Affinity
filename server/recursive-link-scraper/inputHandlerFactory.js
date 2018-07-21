module.exports =  function inputHandlerFactory(){
    
    let hrefState = {
        scanned:{},
        unscanned: {}
    }

    return {
        addToListsFromDb: function(input) {
            input.map( obj => hrefState.scanned[obj.page] = 1)
        },

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

        moveToBlacklist : function(inputUrl) {

            if(!hrefState.unscanned[inputUrl]) {
                hrefState.unscanned[inputUrl] = 1
            }
            hrefState.scanned[inputUrl] = hrefState.unscanned[inputUrl]
            delete hrefState.unscanned[inputUrl]

        },

        blacklistIncludes: function(inputUrl) {

            const deprotocolled = inputUrl.split( '/' ).splice(1, inputUrl.split('/').length-1).join('/')
            // const protocol = pathArray[0];
            // const host = pathArray[2];
            // const deprotocolled = protocol + '//' + host + '/';

            if(hrefState.scanned['https:/' + deprotocolled] || hrefState.scanned['http:/' + deprotocolled] ) {
                return true
            }
            return false;
        }

    }

}