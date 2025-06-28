const mongoose = require('mongoose');
const review = require('./review');
const Schema=mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image:{
         type: String, 
         default:"https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         set:(v)=>
            v==="" ? "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
         required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    review : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

//When we delete listing then we want reviews also delete that post on given listing
listingSchema.post('findOneAndDelete', async function (listing) {
    if (listing.review && listing.review.length) {
        const res = await review.deleteMany({ _id: { $in: listing.review } });
        console.log(res);
    }
 
});





const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
