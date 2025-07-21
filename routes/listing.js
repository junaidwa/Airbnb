const express = require("express");
const router = express.Router();
const listing = require("../models/listing");
const review = require("../models/review");
const WrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");
// const { listingSchema} = require("../Schema.js");
const mongoose = require("mongoose");
const passport = require("passport");
const { IsLoggedIn, isOwner, validateListing } = require("../middleware.js");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));


const { cloudinary, storage } = require("../cloudconfig.js");

const multer  = require('multer')
const upload = multer({storage });

const listingController = require("../controllers/listing.js");

//Show All Listings route
router.get("/", WrapAsync(listingController.index));

// Create a new listing route
router.get("/new", IsLoggedIn, WrapAsync(listingController.renderNewForm));

// Show Route
router.get("/:id",WrapAsync(listingController.showListingInfo));

//Create new listings   validatelisting middleware add krna hy

router.post( "/", IsLoggedIn, upload.single('listing[image]'), WrapAsync(listingController.createListing));





//Edit Route
router.get("/:id/edit", IsLoggedIn, isOwner, WrapAsync(listingController.EditRoute ));

//Update Route
// Assuming you're using Express Router
router.put(
  "/:id",
  IsLoggedIn,
  isOwner,
  validateListing,
  WrapAsync(listingController.updateListing)
);

//Delete  Route
router.delete("/:id", IsLoggedIn, isOwner,WrapAsync( listingController.deleteListing) );

module.exports = router;
