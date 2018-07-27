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

app.use(express.static( __dirname+'/../build'))

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

// SCHEDULE DB CLEARING
const schedule = require('node-schedule')
const clearDb = schedule.scheduleJob(' */1 * * * *', async () => {
    console.log('checking db length')
    let list = await dbConn.db_links()
    if(list.length > 8000) {
        dbConn.db_table_schema();
        console.log('cleardb')
    }
})

// SOCKETS
io.on('connection', socket => {
    console.log('user Connected')

    socket.on('landing page', () => {
        breadthDbQuery(socket, dbConn)
    })

    socket.on('new scan', async (newScanData) => {
        console.log('receiving new scan data')

        const { newScanUrl, newScanDepth, puppeteerOnly } = newScanData
        const baseUrl = getBaseUrl(newScanUrl)

        let isGoodUrl = false

        try {
            isGoodUrl = await axios.get(baseUrl)
        } catch(err) {
            console.log('bad new scan url')
            socket.emit('bad url')
        }

        if (isGoodUrl) {
                let achievedDepth = await breadthDbQuery(socket, dbConn, newScanUrl, +newScanDepth)
                console.log(newScanDepth ,achievedDepth[0])
                if(+newScanDepth - achievedDepth[0]) {
                    console.log(achievedDepth[1], (+newScanDepth - achievedDepth[0]), false, achievedDepth[0])
                    breadthScraper(achievedDepth[1], (+newScanDepth - achievedDepth[0]), socket, dbConn, puppeteerOnly, achievedDepth[0])
                }
        }
    })

    socket.on('get scan data', async (input) => {
        const { url, depth } = input
            let achievedDepth = await breadthDbQuery(socket, dbConn, url, depth)

            if(depth - achievedDepth[0]) {
                console.log(achievedDepth[1], (depth - achievedDepth[0]), false, achievedDepth[0])
                breadthScraper(achievedDepth[1], (depth - achievedDepth[0]), socket, dbConn, false, achievedDepth[0])
            }
    })

    socket.on('disconnect', () => {
     //   session.destroy()
        console.log('disconnected')
    })
})

// CONTROLLERS
const authController = require('./controllers/authController')
const dbController = require('./controllers/dbController')    

// ENDPOINTS
app.get('/auth/callback', authController);
app.get('/api/username', dbController.getUserName)
app.put('/api/username', dbController.updateUserName)
app.get('/api/get/domains', dbController.getDomains)
app.get('/api/get/pages', dbController.getPages)
app.get('/api/verifyuser', (req , res) => {
    if(req.session.user) {
        res.send(true).status(200)
    }
    else {

        res.send(false).status(200)
    }
})

app.post('/api/post/domain', async (req, res) => {
    if(req.session.user) {
        
        const { newScanUrl } = req.body;
        let baseUrl = getBaseUrl(newScanUrl)
        
        if(!baseUrl.startsWith('https')) {
            baseUrl = 'https' + baseUrl.slice(4)
        }

        let userData = await dbConn.find_user(req.session.user.auth_id)
        let domainData = await dbConn.find_domain(baseUrl)
        
        if(!domainData[0]) {
            await dbConn.add_domain(baseUrl)
            domainData = await dbConn.find_domain(baseUrl)
        }

        dbConn.post_user_domain([userData[0].user_id, domainData[0].domain_id])
            .catch((err) => {})
        res.status(200)
    }
})

app.delete('/api/user', async (req, res) => {
    console.log("delete user")
    if(req.session.user) {  
        let userData = await dbConn.find_user(req.session.user.auth_id)

        try {
            await dbConn.delete_reference([userData[0].user_id])
        } catch(error) {
            res.status(500)
            console.log(error)
        }
        try {
        await dbConn.delete_user([userData[0].auth_id])
        req.session.destroy()
        res.status(200)
        } catch(error) {
            res.status(500)
            console.log(error)
        }
    }
    res.status(401)
})

app.delete('/api/destory', (req, res) => {
    if(req.session.user) {
        console.log('fired')
        req.session.destroy()
        res.status(200)
    }
})