import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },

        email:{
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },

        password:{
            type: String,
            required: true,
            trim: true,

        },

        department:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },

        role:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true
            
        }

    }, {timestamps: true}
)

const userModel = mongoose.model("Users", userSchema)
export default userModel;