import { Request, Response } from 'express';
import Tasks from '../models/TaskModel';
import { taskValidation } from '../validations/TaskValidation';

const createTask = async (req: Request, res: Response) => {
  try {
    const validation = taskValidation.parse({
      ...req.body,
      user: req.user?._id,
    });
    
    const task = await Tasks.create({ ...validation });

    res.status(201).json({
      success: true,
      message: 'Task created Successfully',
      data: task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: (error as Error).message,
    });
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      // {
      //   $project: {
      //     _id: 0,
      //     name: 1,
      //     description: 1,
      //     isActive: 1,
      //   },
      // },
    ]);
    res.status(200).json({
      success: true,
      data: task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
      error: (error as Error).message,
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = taskValidation.parse(req.body);
    const updateTask = await Tasks.updateOne({ _id: id }, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updateTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: (error as Error).message,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTask = await Tasks.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deleteTask,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: (error as Error).message,
    });
  }
};

const singleTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTask = await Tasks.findOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'Get Single Task successfully',
      data: deleteTask,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get single task',
      error: (error as Error).message,
    });
  }
};

export const taskController = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  singleTask,
};
