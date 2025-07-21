const express = require("express");
const router = express.Router();
const listing = require("../models/listing");
const review = require("../models/review");
const WrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");
// const { listingSchema} = require("../Schema.js");
const mongoose = require("mongoose");
const passport = require("passport");
const {IsLoggedIn,isOwner,validateListing}=require('../middleware.js')
const methodOverride = require('method-override');
router.use(methodOverride('_method'));






//Show All Listings route
router.get("/", async (req, res) => {
  const Alllistings = await listing.find({});
  res.render("listings/index.ejs", { Alllistings });
});

// Create a new listing route
router.get("/new",IsLoggedIn, (req, res) => {
  // console.log(req.user)
 
  res.render("listings/new.ejs");
});
// Show Route
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid listing ID");
  }

  const foundListing = await listing.findById(id)
  .populate({path: "review", populate: { path: "author" }})
  .populate("owner"); // Populate reviews
  if (!foundListing) {
    return res.status(404).send("Listing not found");
  }

  res.render("listings/showroute.ejs", { foundListing }); // ✅ Only one render
});

//Create new listings
router.post('/', IsLoggedIn,validateListing, WrapAsync(async (req, res) => {
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner to the current user
    console.log("USER ID",req.user._id);
    await newListing.save();
    req.flash('success', 'New listing created successfully!');
    res.redirect('/listings');
}));

//Edit Route
router.get("/:id/edit",IsLoggedIn,isOwner, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid listing ID");
  }

  const foundListing = await listing.findById(id);
  if (!foundListing) {
    return res.status(404).send("Listing not found");
  }

  

  res.render("listings/edit.ejs", { foundListing });
});

//Update Route
// Assuming you're using Express Router
router.put("/:id",IsLoggedIn, isOwner, validateListing, WrapAsync(async (req, res) => {
  const { id } = req.params;
  await listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash('success', 'Listing Updated successfully!');
  res.redirect(`/listings/${id}`);
}));



//Delete  Route
router.delete("/:id",IsLoggedIn,isOwner, (req, res) => {
  const { id } = req.params;
  listing
    .findByIdAndDelete(id)
    .then(() => {
        req.flash('success', 'Listing Deleted successfully!');
      res.redirect("/listings");
      console.log("Listing deleted successfully");
    })
    .catch((err) => {
      console.error("Error deleting listing:", err);
      res.status(500).send("Internal Server Error");
    });
});



module.exports = router;