import { Request, Response } from 'express';
import User from '../models/User';
import { UserValidation } from '../validations/UserValidation';
import bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validateData = UserValidation.parse(req.body);
    validateData.password = await bcrypt.hash(
      validateData.password,
      Number(config.bcrypt_salt)
    );

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

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return; // Exit early
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // If user not found
      res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
      return; // Exit early
    }
    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password.toString()
    );

    if (!isPasswordValid) {
      // If password does not match
      res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
      return; // Exit early
    }

    // generate token
    const token = jwt.sign({ id: user._id, role: user.role }, config.jwt_secret as string, {
      expiresIn: '1h',
    });

    // If login is successful, return user data (excluding password)
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to log in',
      error: (error as Error).message,
    });
  }
};

export const UserController = { getUsers, createUser, loginUsers };
