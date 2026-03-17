import { User, TrendingUp, Utensils } from 'lucide-react'

// Sub-componente interno para las tarjetas
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800/50 hover:border-blue-500/30 transition-colors group">
    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20 text-white">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">
      {desc}
    </p>
  </div>
)

const Services = () => {
  return (
    <section id="servicios" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Por qué elegirnos?</h2>
          <p className="text-gray-400">
            Mi enfoque se basa en la personalización, la ciencia y el apoyo constante para garantizar que alcances tus metas de la manera más efectiva y segura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<User size={24} />}
            title="Entrenamiento Personalizado"
            desc="Diseño planes de entrenamiento únicos adaptados a tus objetivos, nivel de condición física y estilo de vida. No hay dos rutinas iguales."
          />
          <FeatureCard 
            icon={<TrendingUp size={24} />}
            title="Seguimiento Constante"
            desc="Monitoreo tu progreso de cerca, ajustando tu plan según sea necesario para superar estancamientos y maximizar los resultados."
          />
          <FeatureCard 
            icon={<Utensils size={24} />}
            title="Asesoramiento Nutricional"
            desc="Recibe pautas de alimentación que complementan tu entrenamiento y aceleran la consecución de tus metas, ya sea perder peso o ganar músculo."
          />
        </div>
      </div>
    </section>
  )
}

export default Services