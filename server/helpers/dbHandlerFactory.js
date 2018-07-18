module.exports = {
    doesPageExist: function(url, db) {
        dbConnection.doesPageExist(url)
            .then( (response) => {
                console.log(response)
                if(response[0]) {
                    return true
                }
                return false
            })
    },

    doesDomainExist: async function(url, dbConnection) {
        dbConnection.doesDomainExist(url)
            .then( (response) => {
                if(response[0]) {
                    return true
                }
                return false
            })
    },

    addPage: async function(url, dbConnection) {
        await dbConnection.addPage
    },
    
    addLinks: async function(dictionary, dbConnection) {
        const dictionaryArray = Object.entries(dictionary)
        
        await dictionaryArray.forEach( entry => dbConnection.addlink(entry))
    }
}
