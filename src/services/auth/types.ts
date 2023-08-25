export type AuthRegisterResponse = {
  avatar: string
  email: string
  name: string
  id: string
  isEmailVerified: boolean
  created: string
  updated: string
}

export type LoginResponse = {
  accessToken: string
}
export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterArgs = {
  html?: string
  name?: string
  password: string
  email: string
  subject?: string
  sendConfirmationEmail?: boolean
}

export type RecoveryResponse = {
  statusCode: number
  message: string
  timestamp: string
  path: string
}
