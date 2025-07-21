const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const saveRedirectURL=require("../middleware.js").saveRedirectURL;

router.get("/SignUp", (req, res) => {
  res.render("./user/signup.ejs");
});

router.post("/SignUp", async (req, res) => {
  const { username, email, password } = req.body;
  const NewUser = new User({
    username,
    email,
  });
  const resutdata = await User.register(NewUser, password);

  console.log(resutdata);

req.login(resutdata, (err) => {
  if (err) {
    return next(err);
  }
  req.flash("success", "Welcome to Wanderlust!");
  res.redirect("/listings");
});

});

router.get("/Login", (req, res) => {
  // res.send("Login")
  res.render("./user/login.ejs");
});

router.post(
  "/Login",
  saveRedirectURL,
  passport.authenticate("local", {
    failureRedirect: "/Login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome Back!");
    let redirectURL = res.locals.returnTO || "/listings";
    res.redirect( redirectURL);
  }
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
});


module.exports = router;
