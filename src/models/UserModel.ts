import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: number;
  role: 'user' | 'admin'; // Add role types here
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'], // Allowed roles
      default: 'user', // Default role for new users
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
