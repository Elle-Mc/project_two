//import express
const express = require("express");
//create a new router
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

module.exports = router;