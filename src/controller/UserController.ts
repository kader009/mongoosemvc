import { Request, Response } from 'express';
import User from '../models/User';
import { UserValidation } from '../validations/UserValidation';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validateData = UserValidation.parse(req.body);

    const user = await User.create(validateData);

    res.status(201).json({
      success: true,
      message: 'User created',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: (error as Error).message,
    });
  }
};

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

const loginUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email });

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: `Invalid ${email} and ${password}` });
    }

    res.status(200).json({
      success: true,
      message: 'user login successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: (error as Error).message,
    });
  }
};

export const UserController = { getUsers, createUser, loginUsers };
