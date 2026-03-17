import EripoSobreMi from '../../assets/EripoSobreMi.jpeg';

const About = () => {
  return (
    <section id="sobre-mi" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Imagen del Entrenador */}
        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
          <img 
            src={EripoSobreMi}
            alt="Lautaro Lencina Entrenador" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-30"></div>
        </div>

        {/* Contenido de Texto */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Sobre Mí</h2>
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              Mi nombre es Lautaro Lencina y soy un apasionado del fitness y el bienestar. Desde joven, el deporte ha sido una parte fundamental de mi vida, llevándome a competir en diversas disciplinas y a comprender la importancia de un cuerpo sano y una mente fuerte.
            </p>
            <p>
              Mi misión es compartir mi conocimiento y experiencia para ayudarte a transformar tu vida. Creo firmemente que con la guía adecuada, dedicación y un plan bien estructurado, cualquier persona puede alcanzar sus objetivos de fitness y llevar una vida más saludable y enérgica.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About