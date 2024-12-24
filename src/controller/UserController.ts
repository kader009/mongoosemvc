import { Request, Response } from 'express';
import User from '../models/User';
import { UserValidation } from '../validations/UserValidation';
import bcrypt from 'bcrypt'
import config from '../config';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validateData = UserValidation.parse(req.body);
    validateData.password = await bcrypt.hash(validateData.password, Number(config.bcrypt_salt))

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

    const user = await User.aggregate([
      { $match: { email } },
      {
        $project: {
          name: 1,
          email: 1,
          password: 1,
          role:1
        },
      },
    ]);

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    if (!user || user.length === 0) {
      // Check if the user array is empty
      res.status(400).json({
        success: false,
        message: `Invalid ${email} or ${password}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'user login successfully',
      user,
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
