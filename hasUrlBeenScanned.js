module.exports = async function hasUrlBeenScanned(url, app) {

    let response = [];

    try {
        response = await app.get('db').doesPageExist([url + '/'])
    } catch(error) {
        console.log(error);
    }
    
    if(response[0]){
        // Does page exist in page table, if so, for how long
        const pageAge = Date.now() - response[0].scan_time;
                // a Month 
        if(pageAge > 2592000000) {
            // deprecate after a month, rescan
            console.log("deprecated, rescan")
            return false;
        }
        console.log('page exists')
        return true;
    } else {
        console.log('page does not exist')
        return false;
    }
}