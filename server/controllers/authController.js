const axios = require('axios');

let {
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    REACT_APP_DOMAIN,
    FRONTEND_DOMAIN
} = process.env

module.exports = async (req, res) => {
    
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `https://${req.headers.host}/auth/callback`
    };
    try {
        console.log(11111)
        var responseWithToken = await axios.post(
            `https://${REACT_APP_DOMAIN}/oauth/token`,
            payload
        );
    } catch (error) {
        console.log(error)
    }

    var userData = await axios.get(
        `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
        responseWithToken.data.access_token
        }`
    );
    console.log(22222)
    
    const dbConn = req.app.get('db');
    let { sub, name } = userData.data;
    let userExists = await dbConn.find_user([sub]);
    
    if (userExists[0]) {
        req.session.user = userExists[0];
        res.redirect(`/#/dashboard`);
        //res.redirect(`${FRONTEND_DOMAIN}/#/dashboard`);
    } else {
        dbConn.create_user([sub, name]).then(createdUser => {
            req.session.user = createdUser[0];
             //res.redirect(`${FRONTEND_DOMAIN}/#/dashboard`);
        res.redirect(`/#/dashboard`);
        });
    }
}