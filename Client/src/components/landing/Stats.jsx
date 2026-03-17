import { Check } from 'lucide-react'

const PricingCard = ({ title, price, desc, buttonText, features, isPopular, isPrimary }) => (
  <div className={`relative flex flex-col p-8 rounded-3xl border ${isPopular ? 'border-blue-500 bg-[#151a28] shadow-2xl shadow-blue-900/20' : 'border-gray-800 bg-[#111827]'}`}>
    {isPopular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        MÁS POPULAR
      </div>
    )}
    <div className="mb-8">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl font-extrabold text-white">${price}</span>
        <span className="text-gray-400">/mes</span>
      </div>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
    
    <button className={`w-full py-3 px-6 rounded-xl font-bold mb-8 transition-all ${isPrimary ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-transparent border-2 border-gray-700 hover:border-gray-500 text-white'}`}>
      {buttonText}
    </button>
    
    <div className="space-y-4 flex-1">
      {features.map((feature, i) => (
        <div key={i} className="flex items-center gap-3">
          <Check size={18} className="text-blue-500 flex-shrink-0" />
          <span className="text-gray-300 text-sm whitespace-pre-wrap">{feature}</span>
        </div>
      ))}
    </div>
  </div>
)

const Stats = () => {
  return (
    <section id="planes" className="py-24 px-6 md:px-12 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-blue-500 font-bold tracking-wider text-xs md:text-sm uppercase mb-3 block">
            PRECIOS SIMPLES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">Planes flexibles para cada etapa</h2>
          <p className="text-gray-400 text-lg">
            Comienza gratis y escala a medida que crece tu cartera de clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          <PricingCard 
            title="Básico"
            price="0"
            desc="Perfecto para empezar"
            buttonText="Comenzar gratis"
            features={[
              "Hasta 5 alumnos",
              "Rutinas básicas",
              "App para alumnos"
            ]}
          />
          <PricingCard 
            title="Pro"
            price="29"
            desc="Para entrenadores en crecimiento"
            buttonText="Elegir Pro"
            isPopular={true}
            isPrimary={true}
            features={[
              "Hasta 50 alumnos",
              "Integración YouTube completa",
              "Soporte prioritario",
              "Reportes de progreso"
            ]}
          />
          <PricingCard 
            title="Ilimitado"
            price="99"
            desc="Para gimnasios o estudios"
            buttonText="Contactar ventas"
            features={[
              "Alumnos ilimitados",
              "Marca blanca (App)",
              "API Access",
              "Multi-entrenador"
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default Stats