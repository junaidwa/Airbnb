const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const saveRedirectURL=require("../middleware.js").saveRedirectURL;

const UserController = require("../controllers/user.js");

router.get("/SignUp",UserController.RenderSignUp );

router.post("/SignUp", UserController.SignUp);

router.get("/Login", UserController.RenderLogin);

router.post(
  "/Login",
  saveRedirectURL,
  passport.authenticate("local", {
    failureRedirect: "/Login",
    failureFlash: true,
  }),
  UserController.Login
);
router.get("/logout", UserController.logout);


module.exports = router;
