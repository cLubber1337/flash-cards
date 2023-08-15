import { z } from 'zod'

import { addNewPackSchema } from '../validation/addNewPackSchema.ts'

export type AddNewPackValues = z.infer<typeof addNewPackSchema>
