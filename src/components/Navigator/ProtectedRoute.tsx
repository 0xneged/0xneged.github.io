import { PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router'

type ProtectedRouteProps = PropsWithChildren & {
  isAllowed: boolean
  redirectPath?: string
}

export default function ProtectedRoute({
  isAllowed: stateCheck,
  redirectPath = '/',
  children,
}: ProtectedRouteProps) {
  if (!stateCheck) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
