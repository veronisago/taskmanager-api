import { Request, Response } from 'express';
import Task from '../models/Task';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorised' });
      return;
    }

    const newTask = await Task.create({ userId: req.user.id, title, description, status });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorised' });
      return;
    }

    const tasks = await Task.find({ userId: req.user.id }).lean();

    const formatTasks = (taskArray: any[]) =>
      taskArray.map(({ _id, ...task }) => ({ id: _id.toString(), ...task }));

    const groupedTasks = {
      "To Do": formatTasks(tasks.filter(task => task.status === "To Do")),
      "In Progress": formatTasks(tasks.filter(task => task.status === "In Progress")),
      "Done": formatTasks(tasks.filter(task => task.status === "Done")),
    };

    res.status(200).json(groupedTasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: 'Error getting tasks' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorised' });
      return;
    }

    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Task not found' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorised' });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorised' });
      return;
    }

    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};
