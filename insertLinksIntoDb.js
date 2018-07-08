module.exports = async function insertLinksIntoDb (fromPage, dictionary, app) {
    // break key value pairs into an array of arrays containing the pairs
    //console.log(222, dictionary)
    const linksArray = Object.entries(dictionary);


    await  linksArray.forEach( (pair) => {
       app.get('db').addLinks([ fromPage + '/' , ...pair])
        .catch(err => console.error(err))
    })

}