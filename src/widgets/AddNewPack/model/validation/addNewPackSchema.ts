import { z } from 'zod'

export const addNewPackSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name should be at least 3 characters long')
    .max(30, 'Name should be at most 30 characters long'),
  isPrivate: z.boolean().default(false),
  cover: z.any(),
})
