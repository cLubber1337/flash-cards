import { z } from 'zod'

export const registrationFormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(3, 'Password should have a minimum of 3 characters'),
    confirmPassword: z.string().min(3, 'Password should have a minimum of 3 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
