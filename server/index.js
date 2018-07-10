var app = require('express')();
var io = require('socket.io')(app);
const massive = require('massive');
require('dotenv').config();
 

let {
  REACT_APP_DOMAIN,
  SERVER_PORT,
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET,
  CONNECTION_STRING,
  SESSION_SECRET
} = process.env

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

massive(CONNECTION_STRING)
  .then( db => {
    app.set('db', db);
    console.log('db connection established')
  })
  .catch(err => console.log(err))

// CONTROLLERS
const authController = require('./authController')


// ENDPOINTS


app.listen(SERVER_PORT, () => console.log(`Pulling into port ${SERVER_PORT}`))

