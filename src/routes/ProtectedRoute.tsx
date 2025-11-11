// src/routes/ProtectedRoute.tsx
import { useAuth } from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from './paths'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} replace />
  }

  return <Outlet />
}
