import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

// Configurar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app: Application = express();

// Middlewares
app.use(express.json()); // Para manejar JSON en las peticiones
app.use(cors()); // Habilita CORS
app.use(helmet()); // Seguridad HTTP

// Conectar a MongoDB
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log('🟢 Conectado a MongoDB Atlas'))
    .catch((err) => console.error('🔴 Error al conectar MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
