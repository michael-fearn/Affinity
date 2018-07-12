// const express = require('express')
// const app = express()
// const http = require('http')
// const socket = require('socket.io')
// const port = 4000;
// const server = http.createServer(app)
// const io = socket(server)
const pageScraper = require('./pageScraper')
const breadthScraper = require('./breadthScraper')

// io.on('connection', socket => {
//     console.log('user connected')

//     socket.on('send data',  url => {
//         console.log('caught emit')
       breadthScraper({}, 2, 'https://www.threadless.com' )
//        // io.sockets.emit('send data', () =>  pageScraper(url))
//     })

//     socket.on('disconnect', () => {
//         console.log('user disconnected ')
//     })
// })

// server.listen(port, () => console.log('listening on port 4001'))
