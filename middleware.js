module.exports.IsLoggedIn =(req,res,next)=>{
     if(!req.isAuthenticated()){
    req.flash("error","User Must be logged in");
  return  res.redirect('/Login')
  }
    next();
}