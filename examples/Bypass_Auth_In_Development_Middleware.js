const imposterUser = {
    id: 1 ,
    auth_id: 'pawnee|1337', 
    user_name: 'Ron Swanson',
    user_pic: 'https://mediadc.brightspotcdn.com/dims4/default/4f87e48/2147483647/strip/true/crop/808x808+0+0/resize/808x808!/quality/90/?url=https%3A%2F%2Fmediadc.brightspotcdn.com%2F72%2Fd9%2F46a05bb16dc6255d60ff6a685472%2F998bdb362952772bbecfc953f6a03a35.jpg'
}

module.exports = {
    bypassAuthInDevelopment: (req, res, next) => {
        if(process.env.NODE_ENV === 'development' && !req.session.user) {
            req.session.user = imposterUser
            next()
        } else {
            next()
        }
    }
}