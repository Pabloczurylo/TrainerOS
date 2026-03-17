import { CheckCircle2 } from 'lucide-react'

const About = () => {
  return (
    <section id="detalle" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Imagen / Mockup del Entrenador u App */}
        <div className="relative h-[500px] w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#111827] border border-gray-800">
          <img 
            src="https://images.unsplash.com/photo-1526506168051-51214040da5b?q=80&w=2070&auto=format&fit=crop"
            alt="Trainer usando la app" 
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent"></div>
          
          {/* Floating Badge on Image */}
          <div className="absolute bottom-6 left-6 right-6 bg-[#1a1f2e]/90 backdrop-blur-md border border-gray-700 rounded-xl p-4 flex items-center gap-4 transform hover:-translate-y-2 transition-transform duration-300">
             <div className="bg-blue-500/20 p-2 rounded-full">
               <CheckCircle2 className="text-blue-500" size={24} />
             </div>
             <div>
               <p className="text-white font-bold text-sm">Rutina enviada con éxito</p>
               <p className="text-gray-400 text-xs">Juan Pérez la ha recibido en su móvil</p>
             </div>
          </div>
        </div>

        {/* Contenido de Texto */}
        <div className="space-y-8">
          <span className="text-blue-500 font-bold tracking-wider text-xs md:text-sm uppercase block">
            SECCIÓN EN DETALLE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Dedica menos tiempo al Excel y más tiempo a tus clientes
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Nuestra interfaz intuitiva te permite duplicar rutinas, asignar planes preestablecidos y modificar cargas en segundos. Lo que antes te tomaba horas, ahora lo haces en minutos.
          </p>
          
          <ul className="space-y-4 pt-4">
             <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                <span className="font-medium">Biblioteca de ejercicios pre-cargada</span>
             </li>
             <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                <span className="font-medium">Historial de entrenamiento por cliente</span>
             </li>
             <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                <span className="font-medium">Chat integrado para feedback rápido</span>
             </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About