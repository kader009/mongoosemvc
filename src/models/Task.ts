import mongoose, { Schema } from 'mongoose';

interface taskType {
  name: string;
  description: string;
  isActive: boolean;
}

const TaskScheme: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

const Tasks = mongoose.model<taskType>('Task', TaskScheme);

export default Tasks;
