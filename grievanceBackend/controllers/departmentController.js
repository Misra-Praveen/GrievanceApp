import departmentModel from "../models/departmentModel.js";


export const createDepartment = async (req, res) => {
    try {
        const {name} = req.body;
        const department = await departmentModel.findOne({name});
        if(department){
            return res.status(409).json({message: "Duplicate not allow deparment already exist."})
        }

        const newDept = new departmentModel({name: name.toUpperCase()});
        await newDept.save()
        return res.status(201).json({message: "Department created successful",newDept})
    } catch (error) {
        return res.status(500).json({message: "Department creation failed", error : error.message})   
    }
}

export const getAllDepartment = async (req, res)=> {

    try {
        const department = await departmentModel.find({status : true}).sort({name : 1})
        return res.status(201).json({message: "Fetched all department successful", department})

    } catch (error) {
        return res.status(500).json({message: "Department fetched failed", error : error.message}) 
        
    }

}