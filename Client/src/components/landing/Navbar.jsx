import { Link } from 'react-router-dom'
import { Dumbbell } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="w-full z-50 py-4 px-6 md:px-12 bg-[#0b0f19] border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Nombre */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
          <Dumbbell className="text-blue-500" size={24} />
          <span>TrainerOS</span>
        </div>
        
        {/* Enlaces Centrales (Ocultos en móvil) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#caracteristicas" className="hover:text-white transition-colors">Características</a>
          <a href="#planes" className="hover:text-white transition-colors">Planes</a>
          <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
        </div>

        {/* Botones de Autenticación y Contacto */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="hidden md:block text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Log In
          </Link>
          <button 
            className="hidden md:block text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Sign In
          </button>
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
          >
            Prueba gratis
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar