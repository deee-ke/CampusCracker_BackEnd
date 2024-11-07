// 1)import dotenv
// Loads .env file contents ito process.env by default
require ('dotenv').config()

// 2)import express
const express = require('express')

// 3)import cors
const cors = require('cors')

// import router
const router = require('./Routing/router')

// import connection.js 
require('./DB/connection')

// 4)create server
// Creates an Express application. The express() function is a top-level function exported by the express module
const ccServer = express()

// 5)use of cors by server
ccServer.use(cors())

// 6) json parsing -Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. - javasript Object 
ccServer.use(express.json())

// server using the router
ccServer.use(router);

// 7) customixe port -bydefault - 3000
const PORT = 4000 || process.env

// 8)Run server
ccServer.listen(PORT, () => {
    console.log(`SERVER RUNNING...... ${PORT}`);
})

// // get request
// ccServer.post('/',(req,res) => {
//     res.send("post request")
// })

