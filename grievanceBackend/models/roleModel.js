import mongoose, { model, Schema } from "mongoose";


const roleSchema = Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

        permissions: [
            {
                type: String
            }
        ]

    }, 
    { timestamps: true }
)

// ****** Compound Unique Index ******
roleSchema.index({ name: 1, department: 1 }, { unique: true });

const roleModel = model("Role", roleSchema);
export default roleModel;