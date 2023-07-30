import { z } from 'zod'

import { loginSchema } from '@/components/Auth/LoginForm'

export type FormValues = z.infer<typeof loginSchema>
