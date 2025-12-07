import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';


dotenv.config();

//console.log(`MongoDB URI --> ${process.env.MONGODB_URI}, \n PORT --> ${process.env.PORT}`)

// DataBase Connection
connectDB()
const app =new express();

//Middleware
app.use(express.json())

//Routes
app.use("/api/auth",userRouter)

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} `)
})
