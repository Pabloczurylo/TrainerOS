import { Users, Youtube, RefreshCw } from 'lucide-react'

// Sub-componente interno para las tarjetas
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 transition-all hover:border-gray-600 group">
    <div className="w-12 h-12 bg-[#1f2937] border border-gray-700 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
)

const Services = () => {
  return (
    <section id="caracteristicas" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto border-t border-gray-800/50 pt-24">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-blue-500 font-bold tracking-wider text-xs md:text-sm uppercase mb-3 block">
            TODO LO QUE NECESITAS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">Características diseñadas para entrenadores</h2>
          <p className="text-gray-400 text-lg">
            Optimiza tu tiempo y ofrece un servicio premium a tus clientes con nuestras herramientas especializadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Users size={24} className="text-blue-500" />}
            title="Gestión de Alumnos"
            desc="Crea y gestiona perfiles de alumnos manualmente con facilidad. Mantén un registro detallado de su progreso, medidas y objetivos."
          />
          <FeatureCard 
            icon={<Youtube size={24} className="text-red-500" />}
            title="Creador de Rutinas"
            desc="Diseña rutinas personalizadas integrando videos de YouTube directamente tu biblioteca de ejercicios organizada y accesible."
          />
          <FeatureCard 
            icon={<RefreshCw size={24} className="text-green-500" />}
            title="Automatización"
            desc="Gestiona nuevos leads o alumnos y seguimiento. Deja que el sistema trabaje por ti enviando recordatorios y actualizaciones."
          />
        </div>
      </div>
    </section>
  )
}

export default Services