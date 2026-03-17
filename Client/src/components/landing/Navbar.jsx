import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <nav className="w-full z-50 py-6 px-6 md:px-12 bg-[#0a0a0a] border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Nombre */}
        <div className="font-bold text-xl tracking-tight text-white">
          Lautaro Lencina
        </div>
        
        {/* Enlaces Centrales (Ocultos en móvil) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
          <a href="#sobre-mi" className="hover:text-white transition-colors">Sobre Mí</a>
          <a href="#testimonios" className="hover:text-white transition-colors"></a>
        </div>

        {/* Botón de Contacto */}
        <div>
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            Iniciar Sesion
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar