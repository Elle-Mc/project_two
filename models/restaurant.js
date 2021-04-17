// Import schema and model
const {Schema, model} = require("../db/connection")

// The Restaurant Schema
const RestaurantSchema = new Schema({
    name: String,
    location: String,
    dish: String,
    notes: String
})

// The User Schema
// const UserSchema = new Schema({
//     username: {type: String, unique: true, required: true},
//     password: {type: String, required: true},
//     // this is importing the above restaurant schema
//     // restaurant: [RestaurantSchema]
// }, {timestamps: true})

// The restaurant Model
const Restaurant = model("Restaurant", RestaurantSchema)

// Export the Restaurant Model
module.exports = Restaurant

// Models are a way to save data to our database