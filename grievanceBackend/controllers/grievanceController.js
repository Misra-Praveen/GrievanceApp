import grievanceModel from "../models/grievanceModel.js";
import generateGrievanceNo from "../utils/generateGrievanceNo.js"


export const createGrievance = async (req, res)=>{
    try {
        const grievanceNo = await generateGrievanceNo();
        const grievance = new grievanceModel({
            grievanceNo,
            ...req.body
        });

        await grievance.save();
        return res.status(201).json({message: "Grievance submitted successfully", grievance, grievanceNo})

    } catch (error) {
        return res.status(500).json({message: "Failed to submit grievance", error: error.message})
    }
}


export const  getGrievanceByGrievanceNo  = async (req, res)=>{
    try {
        const {grievanceNo} = req.query
        const grievance = await grievanceModel.findOne({grievanceNo});

        if(!grievance){
            return res.status(409).json({message: "Invalid Grievance No."})
        }

        return res.status(200).json({message: "Successfully fetch grievance", grievance})

    } catch (error) {
        return res.status(500).json({message: "Failed to fetch grievance", error: error.message})
    }
}


export const getAllGrievance = async (req, res)=>{
    try {
        const grievance = await grievanceModel.find();
        return res.status(200).json({message: "Successfully fetch grievance", grievance})
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch grievance", error: error.message})
    }
}