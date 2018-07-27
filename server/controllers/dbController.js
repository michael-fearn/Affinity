module.exports = {
    getUserName: async (req, res) => {

        if (req.session.user) {
            const {
                auth_id
            } = req.session.user
            const dbConn = req.app.get('db')

            let userData = await dbConn.find_user([auth_id])
            res.send(userData[0].user_name).status(200)
        } else {

            res.status(401)
        }
    },
    updateUserName: async (req, res) => {
        
        if (req.session.user) {

            const {
                auth_id
            } = req.session.user
            const dbConn = req.app.get('db')
            let userData = await dbConn.find_user([auth_id])

            if (userData) {

                await dbConn.update_user_name([req.body.user_name, auth_id])
                res.status(200)
            } else {

                res.status(401)
            }
        } else {

            res.status(401)
        }
    },
    getDomains: async (req, res) => {

        if (req.session.user) {
            const {
                auth_id
            } = req.session.user
            const dbConn = req.app.get('db')
            let userData = await dbConn.get_user_domains([auth_id])
            res.send(userData).status(200)

        }
    },
    getPages: (req, res) => {
        const dbConn = req.app.get('db')
        dbConn.get_popular_pages()
            .then(response => {
                res.send(response).status(200)
            })
    }
}