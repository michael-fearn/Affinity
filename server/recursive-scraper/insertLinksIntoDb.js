module.exports = async function insertLinksIntoDb (fromPage, dictionary, app) {
    // break dictionary into pairs into an array of arrays containing the pairs
    const linksArray = Object.entries(dictionary);

    await  linksArray.forEach( (pair) => {
       app.get('db').addLinks([ fromPage + '/' , ...pair])
        .catch(err => console.error(err))
    })
}