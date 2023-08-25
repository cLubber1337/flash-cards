import { z } from 'zod'

export const addNewCardSchema = z.object({
  question: z
    .string()
    .min(3, 'Question should be at least 3 characters long')
    .max(35, 'Question should be at most 20 characters long'),
  answer: z
    .string()
    .min(3, 'Answer should be at least 3 characters long')
    .max(35, 'Answer should be at most 20 characters long'),
  answerImg: z.any(),

  questionImg: z.any(),
})
