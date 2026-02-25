const express=require("express");
const router=express.Router();
const {RegisterUser,loginUser,LogoutUser,checkAuth}=require("../../controllers/authController");
const isLoggedIn = require("../../middleware/authMiddleware");

router.post("/register",RegisterUser);

router.post("/login",loginUser);

router.post("/logout",LogoutUser);

router.get("/check",isLoggedIn, checkAuth);


module.exports=router;