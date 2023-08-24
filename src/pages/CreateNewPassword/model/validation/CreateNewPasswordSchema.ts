import { loginFormSchema } from '@/components/Auth/LoginForm'

export const CreateNewPasswordSchema = loginFormSchema.pick({ password: true })
