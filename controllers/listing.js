const { model } = require("mongoose");
const mongoose = require("mongoose");
const listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const Alllistings = await listing.find({});
  res.render("listings/index.ejs", { Alllistings });
};

module.exports.renderNewForm = async (req, res) => {
  // console.log(req.user)
  res.render("listings/new.ejs");
};

module.exports.showListingInfo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid listing ID");
  }
  const foundListing = await listing
    .findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner"); // Populate reviews
  if (!foundListing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/showroute.ejs", { foundListing }); // ✅ Only one render
};

module.exports.createListing = async (req, res) => {
  try {
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;

    // Handle image upload
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    await newListing.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
  } catch (err) {
    console.error("Error creating listing:", err);
    req.flash("error", "Error creating listing: " + err.message);
    res.redirect("/listings/new");
  }
};

module.exports.EditRoute = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid listing ID");
  }
  const foundListing = await listing.findById(id);
  if (!foundListing) {
    return res.status(404).send("Listing not found");
  }


  let originalImage= foundListing.image ? foundListing.image.url : null;
  originalImage=originalImage.replace('/upload','/upload/c_scale,w_200');
  foundListing.image.url = originalImage; // Update the image URL for display

   


  res.render("listings/edit.ejs", { foundListing });
};

module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    let foundListing = await listing.findById(id);
    
    if (!foundListing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Update listing details
    foundListing = await listing.findByIdAndUpdate(
      id, 
      { ...req.body.listing },
      { new: true }
    );

    // Handle new image upload if a file is provided
    if (req.file) {
      foundListing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
      await foundListing.save();
    }

    req.flash("success", "Listing Updated successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error updating listing:", err);
    req.flash("error", "Error updating listing: " + err.message);
    res.redirect(`/listings/${id}`);
  }
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  listing
    .findByIdAndDelete(id)
    .then(() => {
      req.flash("success", "Listing Deleted successfully!");
      res.redirect("/listings");
      console.log("Listing deleted successfully");
    })
    .catch((err) => {
      console.error("Error deleting listing:", err);
      res.status(500).send("Internal Server Error");
    });
};
