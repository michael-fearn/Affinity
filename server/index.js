const express = require('express')
const massive = require('massive')
const app = express()
const http = require('http')
const socket = require('socket.io')
const port = 4000;
const server = http.createServer(app)
const io = socket(server)
require('dotenv').config()
const axios = require('axios')


// HELPERS
const dbHandler = require('./helpers/dbHandlerFactory.js')
const getBaseUrl = require('./helpers/getBaseUrl')
const breadthScraper =  require('./recursive-link-scraper/breadthScraper.js')
const breadthDbQuery = require('./breadthDbQuery');
let dbConn
// DB CONNNECTION
massive(process.env.CONNECTION_STRING)
    .then(db => app.set('db', db))
    .then(() => {
        dbConn = app.get('db')
        console.log('DB connected')
    })
    .catch(error => console.log(error))

// SOCKETS
io.on('connection', socket => {
    console.log('initial connection')
    socket.on('new scan', async (newScanData) => {
        console.log('receiving new scan data')

        const { newScanUrl, newScanDepth } = newScanData
        const baseUrl = getBaseUrl(newScanUrl)
        //
        // Is good url? if so check db to see if it already exists
        //
        let isGoodUrl = false

        try {
          isGoodUrl = await axios.get(baseUrl)
        } catch(err) {
            console.log('bad new scan url')
            socket.emit('bad url')
        }

        if (isGoodUrl) {
            let doesDomainExist = await dbConn.does_domain_exist(baseUrl)
            if(!doesDomainExist[0]) {
                breadthScraper(newScanUrl, +newScanDepth, socket, dbConn)
            } else {
                breadthDbQuery(socket, dbConn, newScanUrl, newScanDepth)
            }
        }

        // function to handlee adding data to database
    })

    socket.on('loading page', () => {
        breadthDbQuery(socket, dbConn)
        socket.disconnect
    })
    // check 
    // socket.on('new scan', (url, depth) => {
    //     breadth
    // })

})


// CONTROLLERS
const authController = require('./controllers/authController')
//const dbController = require('./controllers/dbCont     

// // ENDPOINTS
app.get('/auth/callback', authController);
// app.get('/api/get/domains', verifyUser, dbController.getDomains) 
// app.get('/api/get/pages/:domainId', dbController.getPages) //if id does not exist return top pages
// // verifyUser => is user id associated with Domain id
// app.post('/api/user', verifyUser, dbController.newUser)
// ap.put('/api/user', verifyUser, dbController.updateUser)
// app.delete('/api/remove/:domainId', verifyUser, dbController.deleteDomain)




server.listen(port, () => console.log('listening on port 4000'))