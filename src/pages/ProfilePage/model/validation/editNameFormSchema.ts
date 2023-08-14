import { z } from 'zod'

export const editNameFormSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[\p{L}\s]+$/u, 'Name must consist of letters and spaces only')
    .min(2, 'Name must be at least 2 characters long')
    .max(20, 'Name must be at most 10 characters long'),
})
