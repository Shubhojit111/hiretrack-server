const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userModel=require("../models/userModel")

const RegisterUser=async(req,res)=>
{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password)
        {
            return res.status(400).json({message:"All fields are required"});
        }
        
        const isUserAlreadyExisted=await userModel.findOne({email});
        if(isUserAlreadyExisted)
        {
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        
        const newUser=await userModel.create({
            name,
            email,
            password:hashedPassword
        });

        const token=jwt.sign({
            id:newUser._id,
            name:newUser.name,
            email:newUser.email
        },process.env.JWT_SECRET,{expiresIn:"1h"});

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
        });

        return res.status(200).json({
            message:"User registered successfully",
            user:newUser
        });

        
        
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({message:"All fields are required"});
        }
        
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"User not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token=jwt.sign({
            id:user._id,
            name:user.name,
            email:user.email
        },process.env.JWT_SECRET,{expiresIn:"1h"});

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
        });

        return res.status(200).json({
            message:"User logged in successfully",
            user:user
        });

    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

const LogoutUser=async(req,res)=>{
    try{
        res.cookie("token","",{
            httpOnly:true,
            secure:true,
            sameSite: "none",
        });
        return res.status(200).json({message:"User logged out successfully"});
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

const checkAuth = async (req, res) => { 
  try {
    // If we reach here, the token is valid and attached to req.user
    return res.status(200).json({ authorized: true, user: req.user });
  } catch (error) {
    return res.status(401).json({ authorized: false, message: "Unauthorized" });
  }
};

module.exports={RegisterUser,loginUser,LogoutUser,checkAuth};