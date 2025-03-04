import { Request, Response } from 'express';
import Task from '../models/Task';

// Definir un tipo extendido para Request
interface AuthRequest extends Request {
  user?: { id: string };
}

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const newTask = await Task.create({ userId: req.user.id, title, description, status });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const tasks = await Task.find({ userId: req.user.id }).lean(); // `lean()` convierte a JSON plano

    // Mapear tareas y reemplazar `_id` por `id`
    const formatTasks = (taskArray: any[]) =>
      taskArray.map(({ _id, ...task }) => ({ id: _id.toString(), ...task }));

    // Segmentar tareas por status con `id` en vez de `_id`
    const groupedTasks = {
      "To Do": formatTasks(tasks.filter(task => task.status === "To Do")),
      "In Progress": formatTasks(tasks.filter(task => task.status === "In Progress")),
      "Done": formatTasks(tasks.filter(task => task.status === "Done")),
    };

    res.status(200).json(groupedTasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};
