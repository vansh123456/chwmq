import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
//TODO: Implement cloudinary for image fetch and upload.

export const signup = async(req, res) => {
    const {fullName,email,password} = req.body; 
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const userExists = await User.findOne({
            email
        })
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        });
        //jwt creation
        if(createUser){
            generateToken(createUser._id,res);
            await createUser.save();
            
            return res.status(201).json({
                _id: createUser._id,
                fullName: createUser.fullName,
                email: createUser.email,
            });
         }
         else {
            return res.status(400).json({message: "User not created,Invalid Data"});
         }
         
    }
    catch(error){
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const login = async(req, res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Please fill all the fields"});
    }
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    try{
        const userExists = await User.findOne({
            email
        });
        if(!userExists){
            return res.status(400).json({message: "User does not exist"});
        }

        const checkPassword = await bcrypt.compare(password, userExists.password); //returns True or false
        if(!checkPassword){
            return res.status(400).json({message: "Invalid Password"});
        }
        //jwt creation
        generateToken(userExists._id,res);

        res.status(200).json({
            _id: userExists._id,
            fullName: userExists.fullName,
            email: userExists.email,
        });
    }
    catch(error){
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const logout = async(req,res) => {
    try{
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development", // same as above
          });
          res.status(200).json({ message: "Logged out successfully" });
    }
    catch(error){
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const checkAuth = async(req,res) => {
    try{
        req.status(200).json(req.user);
    }
    catch(error){
        console.log("Error in checkAuth controller", error.message);
        return res.status(500).json({message: "User is not authenticated"});
    }
};

export const updateProfile = async(req,res) => {
    try{
        const {profilePic} = req.body; //req.body main we send profile pic base64 encoding
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "Please provide a profile picture"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
          );
          res.status(200).json(updatedUser);
    }
    catch(error) {
        console.log("Error in updateProfile controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
};