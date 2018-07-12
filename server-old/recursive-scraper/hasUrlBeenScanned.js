module.exports = async function hasUrlBeenScanned(url, app) {

    let response = [];

    try {
        response = await app.get('db').doesPageExist([url])
    } catch(error) {
        console.log(error);
    }
    
    if(response[0]){
        // Does page exist in page table, if so, for how long
        const pageAge = Date.now() - response[0].scan_time;
                // a Month 
        if(pageAge > 2592000000) {
            // deprecate after a month, rescan
            console.log("Starting page deprecated, rescan")
            return false;
        }
        console.log('starting page exists in db')
        return true;
    } else {
        console.log('starting page does not exist in db')
        return false;
    }
}