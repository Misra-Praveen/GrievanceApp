import mongoose from "mongoose";

const grievanceSchema = mongoose.Schema({
    grievanceNo : {
        type: String,
        required: true,
        unique : true,
        index: true
    },

    name:{
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        required: true, 
        enum: ["M", "F", "O"]
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    mobile_No:{
        type: String,
        required: true,
        trim: true
    },
    country:{
        type: String,
        required: true,
    },
    state:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    pincode:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "RESOLVED"],
      default: "PENDING"
      
    }
},
{ timestamps: true })

const grievanceModel = mongoose.model("Grievance", grievanceSchema);

export default grievanceModel;