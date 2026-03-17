import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react' 
import Sidebar from './Sidebar'

const MainLayout = () => {
  // Estado para controlar si el menú móvil está abierto
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Función para abrir/cerrar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex min-h-screen bg-black">
      
      {/* Pasamos el estado y la función a la Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido Principal */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300 overflow-x-hidden">
        
        {/* Botón Menú Móvil (Visible solo en pantallas chicas) */}
        <div className="md:hidden mb-6 flex items-center justify-between">
            <button 
                onClick={toggleSidebar}
                className="text-gray-300 hover:text-white p-2 bg-gray-900 rounded-lg border border-gray-800"
            >
                <Menu size={24} />
            </button>
            <span className="font-bold text-blue-500">PT Manager</span>
        </div>

        {/* Aquí se cargan tus páginas */}
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout