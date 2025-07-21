const review=require("../models/review");
const listing = require("../models/listing");

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const foundListing = await listing.findById(id);

    const newReview = new review(req.body.review);
    newReview.author = req.user._id; // Set the author of the review to the current user
    
    // Save the review first
    await newReview.save();
    
    // Then add it to the listing
    foundListing.review.push(newReview);
    await foundListing.save();

    console.log("Review added successfully");
    req.flash('success', 'Review Created successfully!');
    res.redirect(`/listings/${id}`);
  }


  module.exports.deleteReview = async (req, res) => {
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
  }