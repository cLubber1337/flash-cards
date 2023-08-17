import { z } from 'zod'

import { addNewCardSchema } from '../validation/addNewCardSchema.ts'

export type AddNewCardValues = z.infer<typeof addNewCardSchema>
