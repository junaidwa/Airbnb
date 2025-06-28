const express= require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing');
const review = require('./models/review');
const path = require('path');
const ejsmate= require('ejs-mate');
const { listingSchema ,ReviewSchema} = require('./Schema.js');
const ExpressError = require('./utils/ExpressError');
const WrapAsync = require('./utils/WrapAsync');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsmate); // Use ejs-mate for layout support
app.use(express.static(path.join(__dirname, '/public'))); // Serve static files from the public directory

// Validation middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(detail => detail.message).join(', ');
        throw new ExpressError(errorMsg, 400);
    } else {
        next();
    }
};
const validateReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(detail => detail.message).join(', ');
        throw new ExpressError(errorMsg, 400);
    } else {
        next();
    }
};

const Mongo_URL ="mongodb://127.0.0.1:27017/Wanderlust";

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() 
{
    await mongoose.connect(Mongo_URL)
    
}
app.get('/', (req, res) => {
    res.send('Welcome to Wanderlust API');
});
app.get('/listings', async (req, res) => {
    const Alllistings = await listing.find({});
    res.render('listings/index.ejs', { Alllistings });
});

app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid listing ID');
    }

    const foundListing = await listing.findById(id).populate('review'); // Populate reviews
    if (!foundListing) {
        return res.status(404).send('Listing not found');
    }

    res.render('listings/showroute.ejs', { foundListing }); // ✅ Only one render
});

app.post('/Delete/:id',(req,res)=>{
    const {id} = req.params;
    listing.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/listings');
        console.log('Listing deleted successfully');
    })
    .catch(err => {
        console.error('Error deleting listing:', err);
        res.status(500).send('Internal Server Error');
    });
})


app.post('/listing', validateListing, WrapAsync(async (req, res) => {
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
}));
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid listing ID');
    }

    const foundListing = await listing.findById(id);
    if (!foundListing) {
        return res.status(404).send('Listing not found');
    }

    res.render('listings/edit.ejs', { foundListing });
});
app.post('/listings/:id', validateListing, WrapAsync(async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
})); 


//Review Routes
app.post('/listings/:id/reviews',validateReview, WrapAsync(async (req, res) => {
    const { id } = req.params;
    const foundListing = await listing.findById(id);
 
        const NewReview = new review(req.body.review);
        foundListing.review.push(NewReview); 

    const newReview = new review(req.body.review);
    foundListing.review.push(newReview);
    await newReview.save();
    await foundListing.save();

    // res.send('Review added successfully');
    console.log('Review added successfully');
    res.redirect(`/listings/${id}`);
}));



//Delete Revies
app.post('/listings/:id/reviews/:reviewId', WrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const foundListing = await listing.findById(id);
    
    if (!foundListing) {
        return res.status(404).send('Listing not found');
    }

    // Remove the review from the listing's reviews array
    foundListing.review.pull(reviewId);
    await foundListing.save();

    // Delete the review document
    await review.findByIdAndDelete(reviewId);

    console.log('Review deleted successfully');
    res.redirect(`/listings/${id}`);
}));



// Catch-all for unknown routes
app.use((req, res, next) => {
    const err = new ExpressError('Page Not Found', 404);
    next(err);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error.ejs', { err });
});

const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
