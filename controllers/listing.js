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
  let url=req.find.path;
  let filename=req.file.filename;


  const newListing = new listing(req.body.listing);
  newListing.owner = req.user._id; // Set the owner to the current user
  newListing.image = { url, filename }; // Set the image URL and filename
  console.log("USER ID", req.user._id);
  await newListing.save();
  req.flash("success", "New listing created successfully!");
  res.redirect("/listings");
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
  res.render("listings/edit.ejs", { foundListing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  await listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated successfully!");
  res.redirect(`/listings/${id}`);
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
