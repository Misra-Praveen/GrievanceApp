import mongoose from "mongoose";


const connectDB = async () => {
    
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Database Connected successful")
        // const db = mongoose.connection;
        // db.on("open",()=> console.log("MongoDB Database Connected successful"))
        // db.on("error", ()=> console.log("DataBase Connection Failed"))
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
    
}

export default connectDB;