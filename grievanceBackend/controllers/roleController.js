import roleModel from "../models/roleModel.js";

export const createRole = async (req, res) =>{
    try {
        const {name, department, permissions =[]} = req.body;
        let role = await roleModel.findOne({name, department});
        if(role){
            const newPermissions = permissions.filter((p)=> !role.permissions.includes(p))
            if(newPermissions.length === 0){
                return res.status(409).json({message: "Permissions already exist", role})
            }
            role.permissions.push(...newPermissions);
            await role.save();
            return res.status(201).json({message: "Permissions is added", role})

        }
        const newRole = new roleModel({
            name, department, permissions
        })

        await newRole.save()
        return res.status(201).json({message: "New role is added", newRole})

    } catch (error) {
        console.error("Create Role Error:", error);
        return res.status(500).json({message: "Failed to add role", error: error.message})
        
    }
}


export const getAllRole = async (req, res) =>{
    try {
        const role = await roleModel.find().sort({name: 1})
        return res.status(200).json({message:"Successfully fetch role", role})
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch role", error: error.message})
    }
}