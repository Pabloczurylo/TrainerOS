import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, ClipboardList, Dumbbell, Settings, LogOut, X } from 'lucide-react'
import { useAuthStore } from "../../store/useAuthStore";

// 1. Recibimos las props del MainLayout
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const isActive = (path) => {
    // Exact match for dashboard, partial check for others to keep active state on subpages
    const isCurrentPath = path === '/dashboard' 
      ? location.pathname === path 
      : location.pathname.startsWith(path);
      
    return isCurrentPath 
      ? 'bg-[#1e3a8a]/20 text-[#3b82f6] border-l-2 border-[#3b82f6]' 
      : 'text-gray-400 hover:bg-[#1f2937]/50 hover:text-white border-l-2 border-transparent'
  }

  const menuItems = [
    { path: '/dashboard', name: 'Panel de Control', icon: LayoutDashboard, adminOnly: false },
    { path: '/clients', name: 'Clientes', icon: Users, adminOnly: false },
    { path: '/routines', name: 'Rutinas', icon: ClipboardList, adminOnly: false },
    { path: '/exercises', name: 'Ejercicios', icon: Dumbbell, adminOnly: false },
    { path: '/settings', name: 'Configuración', icon: Settings, adminOnly: false },
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
        fixed left-0 top-0 h-screen w-64 bg-[#0f1422] border-r border-[#1e293b] flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
      `}>
        {/* Encabezado: Logo y Botón Cerrar (X) */}
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#2d68f8] p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <Dumbbell className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm leading-tight">Unlimited Training</h1>
              <p className="text-gray-400 text-xs">{user?.isAdmin ? 'Administrador' : 'Usuario'}</p>
            </div>
          </div>
          {/* Botón X visible solo en móvil */}
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#1e293b] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
          {visibleMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick} // Cerramos menú al navegar
              className={`flex items-center gap-3 px-4 py-3 font-semibold transition-all duration-200 ${isActive(item.path)}`}
            >
              <item.icon size={20} className={isActive(item.path).includes('text-[#3b82f6]') ? 'text-[#3b82f6]' : 'text-gray-400'} />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Footer: User Profile & Logout */}
        <div className="border-t border-[#1e293b] mt-auto">
          <div className="p-4 flex flex-col gap-4">
            {/* User Profile Info like in the dashboard image */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user?.nombre || 'Admin'}&background=c7d2fe&color=3730a3&bold=true`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full" 
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user?.nombre || 'Usuario'}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@utraining.com'}</p>
              </div>
            </div>

            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors font-medium text-sm"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar