///////////////////////////////////////
// Import models
///////////////////////////////////////
const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

//Import restaurant model
const Restaurant = require("../models/Restaurant.js");

///////////////////////////////////////
// Controller functions
///////////////////////////////////////

const index = async (req, res) => {
    // gets restaurants
    const Restaurants = await Restaurant.find ({});
    // changes view
    res.render("restaurants/index", {
        restaurants: Restaurants,
    });
};

// creates a page for each restaurant
const show = async (req, res) => {
    //gets id param
    const id = req.params.id
    //grab a restaurant
    const restaurant = await Restaurant.findById(id)
    //renders view
    res.render("restaurants/show", {
        restaurant
    })
}

// creates new restaurant
const newRestaurant = async (req, res) => {
    res.render("restaurants/new")
}

const create = async (req, res) => {
    try {
        console.log(req.body)
        const restaurant = new Restaurant({
            name: req.body.name,
            location: req.body.location,
            dish: req.body.dish
        })
        restaurant.save()
        res.redirect("/restaurants")
    } catch (error) {
        // send error as json if there is one
        res.json(error);
    }
}

const edit = async (req, res) => {
    const id = req.params.id
    const restaurant = await Restaurant.findById(id)
    res.render("restaurants/edit", {
        restaurant
    })
}

const update = async (req, res) => {
    const id = req.params.id
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, (err, updateModel)=>{
        res.redirect("/restaurants")
    });
}

const destroy = async (req, res) => {
    const id = req.params.id
    await Restaurant.findByIdAndDelete(id)
    res.redirect("/restaurants")
}

///////////////////////////////////////
// Export controller
///////////////////////////////////////
module.exports = {
    index,
    show,
    new: newRestaurant,
    create,
    edit,
    update,
    destroy,
}