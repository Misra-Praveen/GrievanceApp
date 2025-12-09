import mongoose from "mongoose";


const departmentSchema = mongoose.Schema(
    {

        name: {
            type:String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        status:{
            type: Boolean,
            default: true
        }

    }, 
    { timestamps : true } 
)

const departmentModel = mongoose.model("Department", departmentSchema);
export default departmentModel;