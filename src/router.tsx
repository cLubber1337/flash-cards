import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { CardsPage } from '@/pages/CardsPage'
import { DecksPage } from '@/pages/DecksPage'
import { RecoveryPasswordPage } from '@/pages/ForgotPasswordPage/RecoveryPasswordPage.tsx'
import { LearnPackPage } from '@/pages/LearnPackPage/ui/LearnPackPage.tsx'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ResetPasswordPage } from '@/pages/PasswordRecoveryPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegistrationPage } from '@/pages/RegistrationPage'
import { useMeQuery } from '@/services/auth/authApi.ts'

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
    path: '/recover-password',
    element: <RecoveryPasswordPage />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPasswordPage />,
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
    path: '/cards/:deckId',
    element: <CardsPage />,
  },
  {
    path: '/decks/:deckId/learn',
    element: <LearnPackPage />,
  },
]

function PrivateRoutes() {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <Loader />
  const isAuthenticated = !!data

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
