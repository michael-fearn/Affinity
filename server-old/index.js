const express = require('express');
const app = express();
const massive = require('massive');
// const server = require('https').createServer(app);
// const io = require('socket.io')(server);


require('dotenv').config();

const domainScraper = require('./recursive-scraper/domainScraper');

let {
  REACT_APP_DOMAIN,
  SERVER_PORT,
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET,
  CONNECTION_STRING,
  SESSION_SECRET
} = process.env
// MIDLEWARE

app.use(express.json())

// app.use(session({
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))

massive(CONNECTION_STRING)
  .then( db => {
    app.set('db', db);
    console.log('db connection established')
  })
  .then(() => {
    domainScraper('https://www.amazon.com/', 25, app)
  })
  .catch(err => console.log(err))

// CONTROLLERS
const authController = require('./authController')
// const scraperController = require('./scraperController')


// ENDPOINTS

app.get('/auth/callback', authController);


var server = (app.listen(SERVER_PORT, () => console.log(`Pulling into port ${SERVER_PORT}`)))

var io = require('socket.io')(server)


io.on('connection', (socket) => {
  console.log('made Socket Connection')
  socket.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to time with interval', interval)
    setInterval( () => {
      socket.emit('timer', new Date())
    }, interval)
  })
})