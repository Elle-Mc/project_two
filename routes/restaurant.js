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
router.get("/new", RestaurantController.new);

// post request to create a new restaurant
router.post("/", RestaurantController.create);

// edits restaurant
router.get("/:id/edit", RestaurantController.edit);

//index put "/restaurant"
router.put("/", RestaurantController.update)

// delete a restaurant
router.delete("/:id", RestaurantController.destroy);

// shows one page of one restaurant
router.get("/:id", RestaurantController.show);

////////////////////////////////////////
// Export the router
////////////////////////////////////////
module.exports = router