// const breadthScraper = require('./breadthScraper');
let breadthDbQuery = require('./../breadthDbQuery')

// breadthScraper('https://www.threadless.com/', 3)

const express = require('express')
const app = express()
const massive = require('massive')
require('dotenv').config()
let dbConn;
massive(process.env.CONNECTION_STRING)
    .then(db => app.set('db', db))
    .then(() => {
        dbConn = app.get('db')
        console.log('DB connected')
    })
    .catch(error => console.log(error))

setTimeout(() => breadthDbQuery(null, dbConn), 2000)
app.listen(4000, () => console.log('listening on port 4000'))