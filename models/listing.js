const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
      url: String,
      filename: String,
  },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category
});

//When we delete listing then we want reviews also delete that post on given listing
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing.review && listing.review.length) {
    const res = await review.deleteMany({ _id: { $in: listing.review } });
    console.log(res);
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
