
require('dotenv').config()
console.log(process.env.SECRET)



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const review = require("./models/review");
const path = require("path");
const ejsmate = require("ejs-mate");
const { listingSchema, ReviewSchema } = require("./Schema.js");
const WrapAsync = require("./utils/WrapAsync");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ExpressError = require("./utils/ExpressError");
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./models/user"); // Import the User model
const LocalStrategy = require("passport-local"); // Import the local strategy for authentication
const passportLocalMongoose = require("passport-local-mongoose"); // Import passport-local-mongoose for user authentication
// const user=require('./routes/user.js');

app.use(cookieParser("SecretCodes")); // Middleware to parse cookies

const listingRoute = require("./routes/listing"); // Import the listing routes
const reviewsRoute = require("./routes/review"); // Import the review routes
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsmate); // Use ejs-mate for layout support
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files from the public directory
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(flash()); // Use flash for temporary messages

//Express Sesssion
app.use(
  session({
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 1000 * 60 * 60 * 24,
      maxAge: 7 * 1000 * 60 * 60 * 24, // Cookie expires in 1 day
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Wanderlust API");
});

//Create Fake User
app.get("/DemoUser", async (req, res) => {
  const fakeuser = {
    email: "jwattoo564@gmail.com",
    username: "junaidwattoo",
  };

  const UserData = await User.register(fakeuser, "122122");
  res.send(UserData);
});

// Passport Configuration
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy for authentication
passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

app.use((req, res, next) => {
  console.log("Current user:", req.user); // Debug
  res.locals.success = req.flash("success"); // Make success messages available in views
  res.locals.error = req.flash("error"); // Make success messages available in views
  res.locals.CurrentUser = req.user;

  next();
}); // Middleware to set flash messages

const Mongo_URL = "mongodb://127.0.0.1:27017/Wanderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(Mongo_URL);
}

app.use("/listings", listingRoute); // Use the listing routes
app.use("/listings/:id/reviews", reviewsRoute); // Use the review routes, with id from listing
app.use("/", userRouter);

//flash message
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success"); // Make success messages available in views
//   res.locals.error = req.flash("error"); // Make error messages available in views
//   next();
// });

// app.get("/register", (req, res) => {
//   let { name = "Anomynus" } = req.query;
//   req.session.name = name; // Store the name in the session
//   console.log(req.session.name);
//   // res.send(name);
//   if (name === "Anomynus") {
//     req.flash("error", "User Not Found");
//   }
//   else{
//     req.flash("success", `User Registered Successfully`); // Flash a success message
//   }
//   res.redirect("/hello");
// });

// app.get("/hello", (req, res) => {

//   res.render("flashcon.ejs", { name: req.session.name }); // Render a view with the session name and flash message
// });

//Cookies

// app.get("/getcookies", (req, res) => {
//   res.cookie("greets", "Hello, World!");
//   res.cookie("Country", "Pakistan");
//   res.cookie("name", "Muhammad Junaid");

//   res.send("Cookies have been set!");
// });

// //Signed Cookies
// app.get("/setcookie", (req, res) => {
//   res.cookie("name", "Muhammad Junaid", { signed: true }); // Set a signed cookie
//   res.send("Signed cookie has been set!");
// });
// app.get("/VerifyCookie", (req, res) => {
//     console.log(req.signedCookies); // Access signed cookies
//     res.send(req.signedCookies); // Send signed cookies as a response
// });

// app.get("/greets", (req, res) => {
//   const { name = "Anunoumns" } = req.cookies; // Access the 'name' cookie, defaulting to "Anunoumns"
//   res.send(`Hello, ${name}!`); // Send a greeting using the cookie value
// });

// app.get("/Cookie", (req, res) => {
//   //   const cookies = req.cookies; // Access cookies from the request
//   //   res.send("cookie", { cookies }); // Render a view with the cookies
//   console.log(req.cookies);
//   res.send(req.cookies); // Send cookies as a response
// });

// Catch-all for unknown routes - This should be placed after all other routes
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!"));
// });   //This cause a error but i don't know why

// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
