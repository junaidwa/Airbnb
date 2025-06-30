const express = require("express");
const router = express.Router();
const listing = require("../models/listing");
const review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const WrapAsync = require("../utils/WrapAsync");
const { listingSchema} = require("../Schema.js");
const mongoose = require("mongoose");
const passport = require("passport");
const {IsLoggedIn}=require('../middleware.js')





const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(detail => detail.message).join(', ');
        throw new ExpressError(errorMsg, 400);
    } else {
        next();
    }
};


//Show All Listings route
router.get("/", async (req, res) => {
  const Alllistings = await listing.find({});
  res.render("listings/index.ejs", { Alllistings });
});

// Create a new listing route
router.get("/new",IsLoggedIn, (req, res) => {
  console.log(req.user)
 
  res.render("listings/new.ejs");
});
// Show Route
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid listing ID");
  }

  const foundListing = await listing.findById(id).populate("review"); // Populate reviews
  if (!foundListing) {
    return res.status(404).send("Listing not found");
  }

  res.render("listings/showroute.ejs", { foundListing }); // ✅ Only one render
});


router.post('/', validateListing, WrapAsync(async (req, res) => {
    const newListing = new listing(req.body.listing);
    await newListing.save();
    req.flash('success', 'New listing created successfully!');
    res.redirect('/listings');
}));







//Edit Route
router.get("/:id/edit",IsLoggedIn, async (req, res) => {
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
router.post(
  "/:id",
  validateListing,
  WrapAsync(async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
      req.flash('success', 'Listing Updated successfully!');
    res.redirect(`/listings/${id}`);
  })
);

//Delete  Route
router.delete("/:id",IsLoggedIn, (req, res) => {
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