// grab env variables
require("dotenv").config

// import express
const express = require("express")

// import database connection
const mongoose = require("./db/connection")

// import merced logger
const {log} = require("mercedlogger")

// import middleware
const methodOverride = require("method-override")
const morgan = require("morgan")
const cors = require("cors")

// bring in our port
const PORT = process.env.PORT || "2021"

// create APP object
const app = express ()

// set the view engine
app.set("view engine", "ejs")

// Setup middleware
app.use(cors()) // prevents cors errors
app.use(methodOverride("_method"))
app.use(express.static("public")) // serve public folder as static
app.use(morgan("tiny")) // request logging
app.use(express.json()) // parse json bodies
app.use(express.urlencoded({extended: false}))


///////////////////////////////////////
// Routes and Routers
///////////////////////////////////////

// Test route
app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>")
})

///////////////////////////////////////
// App listener
///////////////////////////////////////

app.listen(PORT, () => log.white("🚀 Server Launch 🚀", `Listening on port ${PORT}`))