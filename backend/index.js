import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './connection/connectDB.js';
import studentRoutes from './routes/studentRoutes.js';
import cors from 'cors'

const app= express();
connectDB()
dotenv.config();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/api/students',studentRoutes);

export default app;
