const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing");
const review = require("./models/review");
const path = require("path");
const ejsmate = require("ejs-mate");
const { listingSchema, ReviewSchema } = require("./Schema.js");
const ExpressError = require("./utils/ExpressError");
const WrapAsync = require("./utils/WrapAsync");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser("SecretCodes")); // Middleware to parse cookies

const listings = require("./routes/listing"); // Import the listing routes
const reviews = require("./routes/review"); // Import the review routes

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsmate); // Use ejs-mate for layout support
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files from the public directory
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use("/listings", listings); // Use the listing routes
app.use("/listings/:id/reviews", reviews); // Use the review routes, with id from listing

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
app.get("/", (req, res) => {
  res.send("Welcome to Wanderlust API");
});


//Express Sesssion


app.use(
  session({
    secret: "mysupersecretstring"
  })
);

app.get("/test", (req, res) => {
  res.send("test successful!");
});











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

// // Catch-all for unknown routes
// app.use((req, res, next) => {
//   const err = new ExpressError("Page Not Found", 404);
//   next(err);
// });

// Error-handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error.ejs", { err });
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
