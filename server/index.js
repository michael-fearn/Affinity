const express = require('express')
const massive = require('massive')
const session = require('express-session')
const socket = require('socket.io')
const http = require('http')
const axios = require('axios')

const app = express()
const server = http.createServer(app)
const io = socket(server)

require('dotenv').config()

server.listen(process.env.SERVER_PORT, () => console.log(`listening on port ${process.env.SERVER_PORT}`))


// HELPERS
const getBaseUrl = require('./helpers/getBaseUrl')
const breadthScraper =  require('./recursive-link-scraper/breadthScraper.js')
const breadthDbQuery = require('./breadthDbQuery');

// BODY PARSER
app.use(express.json())

// DB CONNNECTION
let dbConn
massive(process.env.CONNECTION_STRING)
    .then(db => app.set('db', db))
    .then(() => {
        dbConn = app.get('db')
        console.log('DB connected')
    })
    .catch(error => console.log(error))


// SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


// SOCKETS
io.on('connection', socket => {
    console.log('user Connected')
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
        //     let doesDomainExist = await dbConn.does_domain_exist(baseUrl)
        //     if(!doesDomainExist[0]) {
                breadthScraper(newScanUrl, +newScanDepth, socket, dbConn)
        //     } else {
        //         breadthDbQuery(socket, dbConn, newScanUrl, newScanDepth)
        //     }
        }

        // function to handlee adding data to database
    })

    socket.on('landing page', () => {
        breadthDbQuery(socket, dbConn)
        // socket.disconnect
    })
    // check 
    // socket.on('new scan', (url, depth) => {
    //     breadth
    // })

})

// MIDDLEWARE


// CONTROLLERS
const authController = require('./controllers/authController')
const dbController = require('./controllers/dbController')    


// ENDPOINTS
app.get('/auth/callback', authController);
app.get('/api/username', dbController.getUserName)
app.put('/api/username', dbController.updateUserName)
//app.get('/api/get/domains', verifyUser, dbController.getDomains)
 app.get('/api/get/landingpagedata/', (req, res)=> {
    console.log('hit')
    res.status(200)
})
//app.post('api/post/scrapedata', dbController.postScrapeData)
// app.get('/api/get/pages/:domainId', dbController.getPages) //if id does not exist return top pages
// // verifyUser => is user id associated with Domain id
// app.post('/api/user', verifyUser, dbController.newUser)

// app.delete('/api/remove/:domainId', verifyUser, dbController.deleteDomain)