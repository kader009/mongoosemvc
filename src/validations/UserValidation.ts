import { z } from 'zod';

export const UserValidation = z.object({
  name: z.string().min(8, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.number().min(8, 'Password must be at least 8 digits'),
});
