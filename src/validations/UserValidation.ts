import { z } from 'zod';

export const UserValidation = z.object({
  name: z.string().min(8, 'Name must be at least 8 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['user', 'admin', 'manager']).default('user'),
});
