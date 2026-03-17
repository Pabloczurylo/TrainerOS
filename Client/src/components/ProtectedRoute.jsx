import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  // Si no está autenticado, redirigir al Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si sí está autenticado, renderizar las rutas hijas (Outlet)
  return <Outlet />
}

export default ProtectedRoute