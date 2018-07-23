module.exports = {
    getUserName: async (req, res) => {
        console.log('getuser')
        if(req.session.user){ 
        const { auth_id } = req.session.user
        const dbConn = req.app.get('db')
        
           let userData =  await dbConn.find_user([auth_id])
           res.send(userData[0].user_name).status(200)
        }   
    },
    updateUserName: async (req, res) => {

        if(req.session.user){ 

            const { auth_id } = req.session.user
            const dbConn = req.app.get('db')
            let userData =  await dbConn.find_user([auth_id])

            if(userData){

                await dbConn.update_user_name([req.body.user_name, auth_id])
                res.status(200)
            }
            else {

                res.status(401)
            }
        }
        else {

            res.status(401)
        }
    }, 
}