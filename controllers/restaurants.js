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
        const restaurant = new Restaurant({name: req.body.text})
        restaurant.save()
        res.redirect("/restaurants")
    } catch (error) {
        // send error as json if there is one
        res.json(error);
    }
}

const edit = async (req, res) => {
    res.render("edit")
}

const update = async (req, res) => {
    res.render("update")
}

const destroy = async (req, res) => {
    res.send("destroy")
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