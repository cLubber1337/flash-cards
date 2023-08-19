import { z } from 'zod'

const MAX_FILE_SIZE = 200000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

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
  // .refine(files => files?.length == 1, 'Image is required.')
  // .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  // .refine(
  //   files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   '.jpg, .jpeg, .png and .webp files are accepted.'
  // ),
  questionImg: z.any(),
  // .refine(files => files?.length == 1, 'Image is required.')
  // .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
  // .refine(
  //   files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   '.jpg, .jpeg, .png and .webp files are accepted.'
  // ),
})
