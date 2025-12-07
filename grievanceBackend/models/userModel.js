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
            type : String,
            required: true,
            trim: true,
        },

        role:{
            type: String,
            required: true,
            trim: true,
        }

    }, {timestamps: true}
)

const userModel = mongoose.model("Users", userSchema)
export default userModel;