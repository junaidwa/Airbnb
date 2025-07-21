const listing = require("./models/listing");
const review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { listingSchema} = require("./Schema.js");
const { ReviewSchema } = require("./Schema.js");



module.exports.IsLoggedIn = (req, res, next) => {
  // console.log(req.path, " ", req.originalUrl);
  // console.log(`${req.User}`);
  if (!req.isAuthenticated()) {
    req.session.redirectURL = req.originalUrl; // Store the original URL

    req.flash("error", "User Must be logged in");
    return res.redirect("/Login");
  }
  next();
};


module.exports.saveRedirectURL = (req, res, next) => {
  if(req.session.redirectURL){
    res.locals.returnTO = req.session.redirectURL; // Store the original URL in locals

  }
next();
};


module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  let listingid= await listing.findById(id);
  if(listingid.owner.toString() !== req.user._id.toString()){
    req.flash('error', 'You are not the owner of this listing!');
    return res.redirect(`/listings/${id}`);
  }
  next();
};
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const foundReview = await review.findById(reviewId);
  if (!foundReview || foundReview.author.toString() !== req.user._id.toString()) {
    req.flash('error', 'You are not the author of this review!');
    return res.redirect(`/listings/${id}`);
  }
  next();
};


module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(detail => detail.message).join(', ');
        throw new ExpressError(errorMsg, 400);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
      const errorMsg = error.details.map((detail) => detail.message).join(", ");
      throw new ExpressError(errorMsg, 400);
    } else {
      next();
    }
  };

