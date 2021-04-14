///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

///////////////////////////////
// Custom Middleware Functions
////////////////////////////////

// add user to request
const addUserToRequest = async (req, res, next) => {
    // check if the user's logged in (how do I know it's logged in? Session will have id property)
    if (req.session.userId) {
        req.user = await User.findById(req.session.userId)
        next()
    } else {
        next()
    }
}

// checks if req.user exists, if not, redirect to log in page
const isAuthorized = (req, res, next) => {
    if (req.user) {
        next()
    } else { 
        res.redirect("/auth/login")
    }
}

///////////////////////////////
// Router Specific Middleware
////////////////////////////////
router.use(addUserToRequest)


///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", (req, res) => {
    res.render("home")
})

// AUTH RELATED ROUTES

// SIGN UP ROUTE - page with sign up form
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
})

// Post route to save/post the sign up
router.post("/auth/signup", async (req, res) => {
    try {
      // generate salt for hashing
      const salt = await bcrypt.genSalt(10)
      // hash/salt the password
      req.body.password = await bcrypt.hash(req.body.password, salt)
      // Create a user
      await User.create(req.body)
      // Redirect to login page after they create a name
      res.redirect("/auth/login")
    } catch (error) {
      res.json(error)
    }
  })

// Similar process here as above, but for log in (like after you create a user name)
router.get("/auth/login", (req, res) => {
    res.render("auth/login")
})

// Post route to save/post the sign up
router.post("/auth/login", async (req, res) => {
    try {
        // get the user
        const user = await User.findOne({username: req.body.username})
        if (user) {
            // check if passwords match
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
                    // add the user ID property to the session object
                    req.session.userId = user._id
                    // redirect
                    res.redirect("/restaurants");
            } else {
                res.json({error: "Password doesn't match"});
            }
        }else {
            res.json({error: "User doesn't exist"})
        }
    } catch (error){
        res.json(error)
    }
})

// Log out - same processes as above
router.get("/auth/logout", (req, res) => {
    // remove the userId property
    req.session.userId = null
    // redirect to the main page
    res.redirect("/")
});

router.get("/restaurants", isAuthorized, async (req, res) => {
    // pass req.user to our template
    res.render("restaurants", {
        restaurants: req.user.restaurants
    })
})

// Restaurants create route when form submitted
router.post("/restaurants", isAuthorized, async (req, res) => {
    // fetch up to date user
    const user = await User.findOne({ username: req.user.username })
    // push new restaurants and save
    user.restaurants.push(req.body)
    await user.save()
    // redirect back to restaurants index
    res.redirect("/restaurants")
  })

///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router