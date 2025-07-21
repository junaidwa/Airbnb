const express = require("express");
const router = express.Router({ mergeParams: true }); // Use mergeParams to access params from parent routes
const review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const WrapAsync = require("../utils/WrapAsync");
const { validateReview ,IsLoggedIn,isReviewAuthor} = require("../middleware.js");

const mongoose = require("mongoose");
const listing = require("../models/listing");


const ReviewController = require("../controllers/review.js");

//Review Routes
router.post(
  "/",
  IsLoggedIn,
  validateReview,
  WrapAsync(ReviewController.createReview)
);

//Delete Reviews
router.post(
  "/:reviewId",
  IsLoggedIn,
  isReviewAuthor,
  
  WrapAsync(ReviewController.deleteReview)
);

module.exports = router;
