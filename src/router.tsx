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
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage.tsx'
import { CardsPage } from '@/pages/PackPage/CardsPage.tsx'
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
].map(route => ({
  ...route,
  element: <Layout>{route.element}</Layout>,
}))

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/pack',
    element: <CardsPage />,
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <PrivateRoutes />
      </Layout>
    ),
    children: privateRoutes,
  },
  ...publicRoutes,
  {
    path: '*',
    element: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
