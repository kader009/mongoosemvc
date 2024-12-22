import { Request, Response } from 'express';
import Tasks from '../models/Task';
import { taskValidation } from '../validations/TaskValidation';

const createTask = async (req: Request, res: Response) => {
  try {
    const validation = taskValidation.parse(req.body);

    const task = await Tasks.create(validation);
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

const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.find();
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: (error as Error).message,
    });
  }
};

export const taskController = { createTask, getTask };
