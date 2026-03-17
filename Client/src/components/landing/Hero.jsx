import { Instagram, MessageCircle } from 'lucide-react'

const Hero = () => {
  // Configuración del WhatsApp
  const phoneNumber = "5493813951473"; // Formato internacional sin +
  const message = "Hola Lautaro, me gustaría recibir información sobre tus entrenamientos personalizados.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    // 1. SECCIÓN CONTENEDORA (Fondo negro, da el espacio alrededor)
    <section className="bg-[#0a0a0a] px-6 md:px-12 py-8 flex justify-center">
      
      {/* 2. TARJETA DE IMAGEN (El bloque redondeado) */}
      <div className="relative w-full max-w-7xl h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        
        {/* Imagen de Fondo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
            alt="Entrenamiento con cuerdas" 
            className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
          />
          {/* Overlay oscuro (Gradiente para leer mejor el texto) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Contenido (Texto y Botones) */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-lg">
            Entrena sin limites
          </h1>
          <p className="text-lg text-gray-200 mb-10 leading-relaxed drop-shadow-md font-medium">
            ¡Bienvenido! Soy Lautaro Lencina, un entrenador personal dedicado a ayudarte a alcanzar tus metas de fitness a través de rutinas personalizadas y guía experta.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {/* Botón WhatsApp (CORREGIDO) */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <MessageCircle size={20} />
              Contactar por WhatsApp
            </a>
            {/* Botón Instagram */}
            <a 
              href="https://www.instagram.com/lautyi.e/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Instagram size={20} />
              Seguir en Instagram
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero