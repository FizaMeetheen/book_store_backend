// 7. import env
require("dotenv").config() // loads .env file contents into process.env by default

// 1.import express
const express = require("express")

// 5. import cors
const cors = require("cors")

// 8.import routes
const router = require("./router")

// 10.import connection file
require("./db/connection")

// 2.create server
const bookStoreServer = express()

// 6. tell server to use cors
bookStoreServer.use(cors())

// 10.parse request // middleware
bookStoreServer.use(express.json()) 

// 9. tell server to use router
bookStoreServer.use(router)

bookStoreServer.use("/imgUploads",express.static("./imgUploads"))
// 3.create port
const PORT = 4000

// 4.tell server to listen
bookStoreServer.listen(PORT , ()=>{
    console.log(`BookStore Server started Running Successfully at Port Number : ${PORT}`);
})

bookStoreServer.get("/",(req,res)=>{
    res.status(200).send(`BookStore Server started Running Successfully and Waiting for Client Request`)
})

// bookStoreServer.post("/",(req,res)=>{
//     res.status(200).send(`POST Request`)
// })