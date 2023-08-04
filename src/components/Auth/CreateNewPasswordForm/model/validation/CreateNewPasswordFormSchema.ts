import { loginFormSchema } from '@/components/Auth/LoginForm'

export const createNewPasswordFormSchema = loginFormSchema.pick({ password: true })
