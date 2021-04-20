// Create a new router
const router  = require("express").Router();
const RestaurantController = require("../controllers/restaurants");

////////////////////////////////////////
// Router specific middleware
////////////////////////////////////////

// Index route get request to "/restaurants"
router.get("/", RestaurantController.index);

// new restaurant
router.get("/new", RestaurantController.new);

// shows one page of one restaurant
router.get("/:id", RestaurantController.show);

// post request to create a new restaurant
router.post("/", RestaurantController.create);

// delete a restaurant
router.delete("/:id", RestaurantController.destroy);

// edits restaurant
router.get("/:id/edit", RestaurantController.edit);

//index put "/restaurant"
router.put("/:id", RestaurantController.update)

////////////////////////////////////////
// Export the router
////////////////////////////////////////
module.exports = router