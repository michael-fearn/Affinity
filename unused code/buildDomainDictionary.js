module.exports = async function buildDomainDictionary (baseUrl, app) {
    // Currently returns all pages with links: count pairs

    // {
    //     page: {
    //         link: count,
    //         link2: count
    //     },
    //     page2: {
    //         link: count,
    //         link2: count
    //     }
    // }

    
    let response = await app.get('db').getLinks()
    let dictionaryFrame = response.reduce((frame, resData) =>{
        
        if(!frame[resData.from_page]) {
            frame[resData.from_page] = {}
        }
        return frame
    },{})

    let currentDomainDictionary = response.reduce( (frame, linkObj) => {
        frame[linkObj.from_page][linkObj.to_page] = linkObj.count
        return frame
    },dictionaryFrame)
    console.log(currentDomainDictionary)
    return currentDomainDictionary
}
