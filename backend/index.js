import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './connection/connectDB.js';
import studentRoutes from './routes/studentRoutes.js';
import cors from 'cors'

const app= express();
dotenv.config();

const PORT=process.env.PORT || 3008

app.use(cors());
app.use(express.json())
app.use('/api/students',studentRoutes);

app.listen(PORT,()=>{
    connectDB()
    console.log('Server Started at http://localhost:'+PORT)
})