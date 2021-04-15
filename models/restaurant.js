// Import schema and model
const {Schema, model} = require("../db/connection")

// The Restaurant Schema
const Restaurant = new Schema({
    name: String,
    location: String, 
    dish: String,
    notes: String
})

// The User Schema
const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    // this is importing the above restaurant schema
    restaurant: [Restaurant]
}, {timestamps: true})

// THe User Model 
const User = model("User", UserSchema)

// Export the User Model 
module.exports = User

// Models are a way to save data to our database