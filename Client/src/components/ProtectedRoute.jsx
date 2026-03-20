import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ProtectedRoute = () => {
  // Desactivado temporalmente ya que no hay backend:
  // const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const isAuthenticated = true;

  // Si no está autenticado, redirigir al Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si sí está autenticado, renderizar las rutas hijas (Outlet)
  return <Outlet />
}

export default ProtectedRoute