import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Dumbbell, Clock, Zap, HelpCircle } from 'lucide-react'

const ClientExerciseDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { exercise } = location.state || {}

  // --- FUNCIÓN PARA CONVERTIR LINKS DE YOUTUBE ---
  const getEmbedUrl = (url) => {
    if (!url) return null;

    let videoId = null;

    // Caso 1: Es un YouTube Short 
    if (url.includes("shorts/")) {
        videoId = url.split("shorts/")[1].split("?")[0];
    } 
    // Caso 2: Es un link normal de YouTube (watch?v=...)
    else if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    }
    // Caso 3: Es un link corto (youtu.be/...)
    else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    // Si encontramos un ID, devolvemos la URL embed con Autoplay, Mute y Loop
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`;
    }

    // Si no es YouTube, devolvemos la url original (por si acaso fuera un mp4 directo)
    return url;
  };

  useEffect(() => {
    if (!exercise) {
      navigate('/dashboard')
    }
  }, [exercise, navigate])

  if (!exercise) return null

  // Procesamos la URL aquí
  const videoSrc = getEmbedUrl(exercise.videoUrl || exercise.gifUrl);
  const isYouTube = exercise.videoUrl && (exercise.videoUrl.includes("youtube") || exercise.videoUrl.includes("youtu.be"));

  return (
    <div className="min-h-screen bg-black text-white pb-10 animate-in slide-in-from-right duration-300">
      
      {/* 1. Header con Video (Hero) */}
      <div className="relative w-full h-[50vh] bg-gray-900 overflow-hidden">
        
        {/* Botón Volver Flotante */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/70 transition"
        >
          <ArrowLeft size={24} />
        </button>

        {videoSrc ? (
            isYouTube ? (
                <iframe 
                    src={videoSrc} 
                    title={exercise.nombre}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ pointerEvents: 'none' }} // Evita que el usuario toque pausa/play, solo visual
                ></iframe>
            ) : (
                <img 
                    src={videoSrc} 
                    alt={exercise.nombre} 
                    className="w-full h-full object-cover opacity-90"
                />
            )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-700 bg-gray-900">
            <div className="text-center">
                <Dumbbell size={64} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Sin video disponible</p>
            </div>
          </div>
        )}
        
        {/* Degradado inferior para que el texto se lea bien */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>

      <div className="px-5 -mt-8 relative z-10">
        {/* 2. Título y Tags */}
        <h1 className="text-3xl font-bold capitalize mb-2 leading-tight">{exercise.nombre}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {exercise.musculo || "General"}
          </span>
          <span className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Ejecución Técnica
          </span>
        </div>

        {/* 3. Panel de Control (Series/Reps) */}
        <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-[#1a1a1a] border border-gray-800 p-3 rounded-xl text-center">
                <Zap className="mx-auto text-yellow-500 mb-1" size={20} />
                <p className="text-2xl font-bold text-white">{exercise.series || 4}</p>
                <p className="text-[10px] text-gray-400 uppercase">Series</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 p-3 rounded-xl text-center">
                <Dumbbell className="mx-auto text-blue-500 mb-1" size={20} />
                <p className="text-2xl font-bold text-white">{exercise.repeticiones || 12}</p>
                <p className="text-[10px] text-gray-400 uppercase">Reps</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 p-3 rounded-xl text-center">
                <Clock className="mx-auto text-green-500 mb-1" size={20} />
                <p className="text-2xl font-bold text-white">{exercise.descanso ? `${exercise.descanso}"` : "-"}</p>
                <p className="text-[10px] text-gray-400 uppercase">Descanso</p>
            </div>
        </div>

        {/* 4. Instrucciones */}
        <div className="mb-8">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <HelpCircle size={20} className="text-gray-400" />
                Instrucciones
            </h3>
            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-5 space-y-4">
                 {/* Si instructions es un array lo mapeamos, si es string lo mostramos, si no hay nada, default */}
                {Array.isArray(exercise.instructions) && exercise.instructions.length > 0 ? (
                    exercise.instructions.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/20">
                                {idx + 1}
                            </span>
                            <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 italic text-sm">
                        {typeof exercise.instructions === 'string' 
                            ? exercise.instructions 
                            : "Sigue las indicaciones de tu entrenador personal para este ejercicio."}
                    </p>
                )}
            </div>
        </div>

        {/* 5. Botón de "Completado" */}
        <button 
            onClick={() => navigate(-1)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-blue-900/20 active:scale-95 transition-all mb-4"
        >
            ¡Entendido, a darle! 🔥
        </button>

      </div>
    </div>
  )
}

export default ClientExerciseDetail