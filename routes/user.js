const express = require("express");
const router = express.Router();
const User= require('../models/user');
const passport= require("passport");

router.get('/SignUp',(req,res)=>{
    res.render('./user/signup.ejs');
})


router.post('/SignUp',async(req,res)=>{
    const {username,email ,password}= req.body;
    const NewUser= new User({
         username,email

    })
 const resutdata=   await User.register(NewUser,password);

 console.log(resutdata)
 req.flash("success","User SignUp Successfully");
 res.redirect('/listings');

})


router.get('/Login',(req,res)=>{
    // res.send("Login")
    res.render('./user/login.ejs')
})


router.post('/Login',passport.authenticate("local",{flashRedirect:'/Login',flashFailure:true}),async(req,res)=>{
    req.flash("success","Login Successfully");
    res.redirect('/listings');
    

})



module.exports=router;