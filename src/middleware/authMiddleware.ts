import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');

  console.log('Header Authorization:', authHeader);

  if (!authHeader) {
    res.status(401).json({ message: 'Acceso denegado, no hay token' });
    return;
  }

  // Extraer el token eliminando el prefijo "Bearer "
  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token inválido o mal formado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('Error verificando el token:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default authMiddleware;
