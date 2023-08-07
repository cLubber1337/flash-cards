import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { DecksPage } from '@/pages/DecksPage/DecksPage.tsx'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage/ForgotPasswordPage.tsx'
import { LoginPage } from '@/pages/LoginPage/LoginPage.tsx'
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage.tsx'
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegistrationPage />,
  },
  {
    path: '/recover',
    element: <ForgotPasswordPage />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}
