// src/pages/Landing.jsx
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Services from '../components/landing/Services'
import About from '../components/landing/About'
import Stats from '../components/landing/Stats'
import { Dumbbell } from 'lucide-react'

const Landing = () => {
  return (
    <div className="bg-[#0b0f19] min-h-screen text-white font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Stats />
      
      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#111827] to-[#0d121c] rounded-3xl p-10 md:p-16 text-center border border-gray-800 shadow-2xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full"></div>
            
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  ¿Listo para escalar tu negocio?
               </h2>
               <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                  Únete a los miles de entrenadores que ya gestionan sus rutinas de forma inteligente con TrainerOS.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="w-full bg-[#1a1f2e] border border-gray-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 whitespace-nowrap">
                    Empezar ahora
                  </button>
               </div>
               <p className="text-xs text-gray-500 mt-4">
                  No se requiere tarjeta de crédito • Cancelación en cualquier momento
               </p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 px-6 md:px-12 bg-[#05080f] border-t border-gray-800/50 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
           {/* Brand */}
           <div className="col-span-1 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white mb-6">
                 <Dumbbell className="text-blue-500" size={24} />
                 <span>TrainerOS</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                 La herramienta definitiva para potenciar tu gestión de entrenamientos y escalar tu negocio en todo el mundo.
              </p>
           </div>
           
           {/* Links */}
           <div>
              <h4 className="font-bold text-white mb-6">Producto</h4>
              <ul className="space-y-4 text-gray-400">
                 <li><a href="#caracteristicas" className="hover:text-white transition-colors">Características</a></li>
                 <li><a href="#planes" className="hover:text-white transition-colors">Precios</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">La v3.0</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
           </div>
           
           <div>
              <h4 className="font-bold text-white mb-6">Compañía</h4>
              <ul className="space-y-4 text-gray-400">
                 <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
           </div>

           <div>
              <h4 className="font-bold text-white mb-6">Contacto</h4>
              <ul className="space-y-4 text-gray-400">
                 <li><span className="text-gray-300">soporte@traineros.com</span></li>
                 <li><span className="text-gray-300">Buenos Aires, Argentina</span></li>
              </ul>
           </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between text-gray-500">
           <p>© {new Date().getFullYear()} TrainerOS. Todos los derechos reservados.</p>
           <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">Privacidad</a>
              <a href="#" className="hover:text-gray-300">Términos</a>
           </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing