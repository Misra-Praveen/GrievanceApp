import bcryptjs from 'bcryptjs'
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res)=>{
    console.log("REGISTER CONTROLLER HIT");
    try {
        const {userName, email, password, department, role} = req.body;
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(409).json({message: "Email already exists"})
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const newUser = new userModel({
            userName,
            email,
            password: hashPassword,
            department,
            role
        });
        await newUser.save();
        return res.status(201).json({message: "Register Successful", newUser})
    } catch (error) {
        return res.status(500).json({message: "Registration Failed", error: error.message})
    }
}

export const login = async (req, res)=> {
    console.log("LOGIN CONTROLLER HIT");
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({message : "UnAuthorized user: Invalid email id"})
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message : "Invalid password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "2d"})
        return res.status(200).json({message:"Login Successful", 
        token, 
        user:{
            id: user._id,
            userName: user.userName,
            email: user.email,
            department: user.department,
            role: user.role,
        }})

    } catch (error) {
        return res.status(500).json({message: "Login Failed", error: error.message})
    }
}