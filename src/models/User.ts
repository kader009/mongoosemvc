import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: number;
  role: 'user' | 'admin' | 'manager'; // Add role types here
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'], // Allowed roles
      default: 'user', // Default role for new users
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
