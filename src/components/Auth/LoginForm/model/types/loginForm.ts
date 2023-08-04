import { z } from 'zod'

import { loginFormSchema } from '@/components/Auth/LoginForm'

export type LoginFormValues = z.infer<typeof loginFormSchema>
