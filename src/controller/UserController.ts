import { Request, Response } from 'express';
import User from '../models/UserModel';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.find();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: (error as Error).message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const users = await User.findById(req.params.id).select('-password');

    if (!users) {
      const error = new Error('User not found') as Error & { status: number };
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: (error as Error).message,
    });
  }
};

export const UserController = { getUsers, getUser };
