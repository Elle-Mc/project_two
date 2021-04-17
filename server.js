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

//Import router
const RestaurantRouter = require("./routes/restaurant")

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

//HomeRouter
app.use("/restaurant", RestaurantRouter)
app.use("/", RestaurantRouter)

// write these out in INDUCES order (index, new, delete, update, create, edit, show)

// INDEX
app.get('/restaurant', (req, res)=>{
    Restaurant.find({}, (error, allRestaurants) => {
        res.render('index.ejs', {
            restaurants: allRestaurants
        });
    });
});

// NEW
app.get('/restaurant/new', (req, res)=>{
    res.render('new');
});

// DELETE
app.delete('/restaurant/:id', (req, res)=>{
    Restaurant.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/restaurants');//redirect back to restaurants index
    });
});

// UDPATE
app.put('/restaurant/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Restaurant.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
        res.redirect('/restaurants');
    });
});

// CREATE
app.post('/restaurant/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Restaurant.create(req.body, (error, createdRestaurant) => {
        console.log(createdRestaurant) 
        res.redirect('/restaurant');
    });
});

// EDIT
app.get('/restaurant/:id/edit', (req, res)=>{
    Restaurant.findById(req.params.id, (err, foundRestaurant)=>{ //find the restaurant
        res.render(
    		'edit.ejs',
    		{
    			restaurant: foundRestaurant //pass in found restaurant
    		}
    	);
    });
});

// SHOW
app.get('/restaurant/:id', (req, res)=>{
    Restaurant.findById(req.params.id, (err, foundRestaurant)=>{
        res.render("show", {restaurant: foundRestaurant} );
    });
});

///////////////////////////////////////
// App listener
///////////////////////////////////////

app.listen(PORT, () => log.white("🚀 Server Launch 🚀", `Listening on port ${PORT}`))