import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';

dotenv.config();



console.log("URI", process.env.MONGODB_URI, process.env.PORT)
// DataBase Connection
connectDB()
const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} `)
})
