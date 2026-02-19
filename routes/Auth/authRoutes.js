const express=require("express");
const router=express.Router();
const {RegisterUser,loginUser,LogoutUser}=require("../../controllers/authController");

router.post("/register",RegisterUser);

router.post("/login",loginUser);

router.post("/logout",LogoutUser);

// router.get("/me",(req,res)=>
// {
//     console.log(req.body)
//     return res.status(200).json({message:"User found",user:req.body});
// })

module.exports=router;