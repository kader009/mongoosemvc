import { Request, Response } from 'express';
import Tasks from '../models/Task';

const createTask = async (req: Request, res: Response) => {
  const names = 'kader'
  try {
    const { name, description, isActive } = req.body;

    if (!name || !description || !isActive) {
      res.status(400).json({
        success: false,
        message: 'Name, description, and isActive are required',
      });
    }

    const task = await Tasks.create({ name, description, isActive });
    res.status(201).json({
      success: true,
      message: 'Task created',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: (error as Error).message,
    });
  }
};

export const taskController = { createTask };
