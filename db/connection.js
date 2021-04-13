// grab environmental variables
require("dotenv").config()

// import mongoose
const mongoose = require("mongoose")

// import merced logger for colorful logs
const {log} = require("mercedlogger")

// grab database string
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/database"

// Mongoose Config Object
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

// Making the database connection
mongoose.connect(MONGODB_URL, config)

// Handling connection events
mongoose.connection

// Event for when connection opens
.on("open", () => log.green("STATUS", "Connected to Mongo"))

// Event for when connection closes
.on("close", () => log.red("STATUS", "Disconnected from Mongo"))

// Event for an error
.on("error", () => log.red("Error", error))

// Export the connection
module.exports = mongoose