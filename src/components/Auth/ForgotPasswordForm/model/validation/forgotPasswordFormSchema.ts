import { loginFormSchema } from '@/components/Auth/LoginForm'

export const forgotPasswordFormSchema = loginFormSchema.pick({ email: true })
