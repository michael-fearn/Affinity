const express = require('express')
const app = express()
const http = require('http')
const socket = require('socket.io')
const port = 4000;
const server = http.createServer(app)
const io = socket(server)



const breadthScraper =  require('./recursive-link-scraper/breadthScraper.js')

//breadthScraper( 2, 'https://lloydgrubham.com/')

// SOCKETS
io.on('connection', socket => {
    console.log('initial connection')
    socket.on('new scan', (newScanData) => {
        console.log('receiving new scan data')
        const { newScanUrl, newScanDepth } = newScanData
        breadthScraper(socket, newScanDepth, newScanUrl)
        // function to handlee adding data to database
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




server.listen(port, () => console.log('listening on port 4001'))