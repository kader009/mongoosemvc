import { z } from 'zod';

export const taskValidation = z.object({
  name: z.string().min(8, 'Task Name is required'),
  description: z.string().max(100, 'Write down your description'),
  isActive: z.boolean({ required_error: 'isActive is required field' }),
});
