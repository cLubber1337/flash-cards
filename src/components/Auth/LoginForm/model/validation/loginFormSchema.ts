import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .nonempty('Password is required')
    .min(3, 'Password should have a minimum of 3 characters'),
  rememberMe: z.boolean().default(false),
})
