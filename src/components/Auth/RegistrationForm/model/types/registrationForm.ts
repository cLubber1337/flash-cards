import { z } from 'zod'

import { registrationFormSchema } from '@/components/Auth/RegistrationForm'

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>
