const User= require("../models/user");

module.exports.RenderSignUp = (req, res) => {
    
  res.render("./user/signup.ejs");
}


module.exports.SignUp = async (req, res) => {

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
    
    }


module.exports.RenderLogin = (req, res) => {

  // res.send("Login")
  res.render("./user/login.ejs");
}

module.exports.Login = (req, res) => {

    req.flash("success", "Welcome Back!");
    let redirectURL = res.locals.returnTO || "/listings";
    res.redirect( redirectURL);
  }

  module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
}
