import counterModel from "../models/counterModel.js";


const generateGrievanceNo = async ()=>{
    const year = new Date().getFullYear();
    const counterId = `grievance_${year}`;

    const counter = await counterModel.findOneAndUpdate(
        {_id : counterId},
        { $inc : { seq :1 }},
        { new: true, upsert: true }

    )

    const paddedSeq =  String(counter.seq).padStart(5,"0");
    return `${year}${paddedSeq}`
}

export default generateGrievanceNo;