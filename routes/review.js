const express = require("express");
const router = express.Router({ mergeParams: true }); // Use mergeParams to access params from parent routes
const review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const WrapAsync = require("../utils/WrapAsync");
const { ReviewSchema } = require("../Schema.js");
const mongoose = require("mongoose");
const listing = require("../models/listing");

const validateReview = (req, res, next) => {
  const { error } = ReviewSchema.validate(req.body);
  if (error) {
    const errorMsg = error.details.map((detail) => detail.message).join(", ");
    throw new ExpressError(errorMsg, 400);
  } else {
    next();
  }
};

//Review Routes
router.post(
  "/",
  validateReview,
  WrapAsync(async (req, res) => {
    const { id } = req.params;
    const foundListing = await listing.findById(id);

    const NewReview = new review(req.body.review);
    foundListing.review.push(NewReview);

    const newReview = new review(req.body.review);
    foundListing.review.push(newReview); 
    await newReview.save();
    await foundListing.save();

    // res.send('Review added successfully');
    console.log("Review added successfully");
      req.flash('success', 'Review Created successfully!');
    res.redirect(`/listings/${id}`);
  })
);

//Delete Revies
router.post(
  "/:reviewId",
  WrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const foundListing = await listing.findById(id);

    if (!foundListing) {
      return res.status(404).send("Listing not found");
    }

    // Remove the review from the listing's reviews array
    foundListing.review.pull(reviewId);
    await foundListing.save();

    // Delete the review document
    await review.findByIdAndDelete(reviewId);

    console.log("Review deleted successfully");
      req.flash('success', 'Review Deleted successfully!');
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
