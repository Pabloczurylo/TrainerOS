const Stats = () => {
  return (
    <section className="py-12 px-4 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto bg-[#111111] rounded-3xl p-6 md:p-12 text-center border border-gray-800/50">
        
        {/* Subtítulo */}
        <span className="text-blue-500 font-bold tracking-wider text-xs md:text-sm uppercase mb-3 block">
          TU META, MI COMPROMISO
        </span>
        
        {/* Título Principal (Ajustado para móviles) */}
        <h3 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
          Resultados Reales
        </h3>
        
        {/* Párrafo (Centrado y con ancho máximo para lectura) */}
        <p className="text-gray-400 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Sin fórmulas mágicas. Solo constancia, disciplina y una planificación inteligente adaptada a ti.
        </p>
        
      </div>
    </section>
  )
}

export default Stats