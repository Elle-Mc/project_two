// Create a new router
const router  = require("express").Router();
const RestaurantController = require("../controllers/restaurants");
const Restaurant = require("../models/Restaurant");

////////////////////////////////////////
// Router specific middleware
////////////////////////////////////////

// Index route get request to "/restaurants"
router.get("/", RestaurantController.index);

// new restaurant
router.get("/restaurant/new", RestaurantController.new);

// delete a restaurant
router.delete("/restaurant/:id", RestaurantController.destroy);

// post request to create a new restaurant
router.post("/restaurant/", RestaurantController.create);

// edits restaurant
router.get("/restaurant/:id/edit", RestaurantController.edit);

//index put "/restaurant"
router.put("/restaurant/", RestaurantController.update)

// shows one page of one restaurant
router.get("/restaurant/:id", RestaurantController.show);

////////////////////////////////////////
// Export the router
////////////////////////////////////////
module.exports = router