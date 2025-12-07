import jwt from 'jsonwebtoken'
import userModel from '../models/userModel';


export const protect = async (req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "UnAuthorized"})
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({message: "user Not found"})
        }
    
        req.user = user
        // console.log("Logged in user: ", req.user);
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid Token", error: error.message})
    }
}