import { z } from 'zod'

import { CreateNewPasswordSchema } from '../validation/CreateNewPasswordSchema.ts'

export type CreateNewPasswordForm = z.infer<typeof CreateNewPasswordSchema>
