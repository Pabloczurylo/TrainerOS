import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, ClipboardList, Dumbbell, LogOut, X } from 'lucide-react'
import { useAuthStore } from "../../store/useAuthStore";

// 1. Recibimos las props del MainLayout
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
  }

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
    { path: '/clients', name: 'Clientes', icon: Users, adminOnly: true },
    { path: '/routines', name: 'Rutinas', icon: ClipboardList, adminOnly: true },
    { path: '/exercises', name: 'Ejercicios', icon: Dumbbell, adminOnly: true },
  ]

  const visibleMenuItems = menuItems.filter(item => {
    if (user?.isAdmin) return true;
    return !item.adminOnly;
  });

  // Función para cerrar el menú si estamos en móvil al hacer click en un link
  const handleLinkClick = () => {
    if (window.innerWidth < 768) { // 768px es el punto de quiebre 'md'
      toggleSidebar();
    }
  }

  return (
    <>
      {/* 2. OVERLAY (Fondo oscuro para cerrar al hacer click afuera en móvil) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* 3. ASIDE CON CLASES RESPONSIVE */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-gray-800 flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
      `}>
        {/* Encabezado: Logo y Botón Cerrar (X) */}
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
            PT Manager <span className="text-xl">🚀</span>
          </h1>
          {/* Botón X visible solo en móvil */}
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {visibleMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick} // Cerramos menú al navegar
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive(item.path)}`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Footer: Logout */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar