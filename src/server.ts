import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app: Application = express();


app.use(express.json()); 
app.use(cors()); 
app.use(helmet()); 


mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log('🟢 Connected to MongoDB Atlas'))
    .catch((err) => console.error('🔴 Error connecting to MongoDB:', err));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
