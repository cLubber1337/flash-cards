import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(3, 'Password should have a minimum of 3 characters'),
  rememberMe: z.boolean().default(false),
})
