import mongoose, { model, Schema } from "mongoose";


const roleSchema = Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },

        permissions: [
            {
                type: String
            }
        ]

    }, 
    { timestamps: true }
)

const roleModel = model("Role", roleSchema);
export default roleModel;