import { Search, Plus, Filter, Play, Dumbbell, Zap } from 'lucide-react'
import Card from '../components/ui/Card'

const Exercises = () => {
  // Mock Data: Simulamos ejercicios con IDs de videos de YouTube reales
  const exercises = [
    { 
      id: 1, 
      title: "Sentadilla con Barra", 
      muscle: "Piernas", 
      difficulty: "Intermedio", 
      videoUrl: "https://img.youtube.com/vi/gcNh17Ckjgg/hqdefault.jpg" // Miniatura YouTube
    },
    { 
      id: 2, 
      title: "Press de Banca", 
      muscle: "Pecho", 
      difficulty: "Intermedio", 
      videoUrl: "https://img.youtube.com/vi/rT7DgCr-3pg/hqdefault.jpg" 
    },
    { 
      id: 3, 
      title: "Dominadas", 
      muscle: "Espalda", 
      difficulty: "Avanzado", 
      videoUrl: "https://img.youtube.com/vi/eGo4IYlbE5g/hqdefault.jpg" 
    },
    { 
      id: 4, 
      title: "Curl de Bíceps", 
      muscle: "Brazos", 
      difficulty: "Principiante", 
      videoUrl: "https://img.youtube.com/vi/ykJmrZ5v0Oo/hqdefault.jpg" 
    },
    { 
      id: 5, 
      title: "Plancha Abdominal", 
      muscle: "Core", 
      difficulty: "Principiante", 
      videoUrl: "https://img.youtube.com/vi/ASdvN_XEl_c/hqdefault.jpg" 
    },
    { 
      id: 6, 
      title: "Peso Muerto", 
      muscle: "Piernas / Espalda", 
      difficulty: "Avanzado", 
      videoUrl: "https://img.youtube.com/vi/op9kVnSso6Q/hqdefault.jpg" 
    },
  ]

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Biblioteca de Ejercicios</h1>
          <p className="text-gray-400">Gestiona los videos y tutoriales para tus rutinas.</p>
        </div>
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
          <Plus size={20} />
          Nuevo Ejercicio
        </button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Buscar ejercicio..." 
              className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors">
            <Filter size={20} />
            Filtros
          </button>
        </div>
      </Card>

      {/* Grid de Ejercicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="p-0 overflow-hidden group hover:border-blue-500/50 transition-colors cursor-pointer">
            {/* Miniatura del Video */}
            <div className="relative aspect-video bg-gray-800">
              <img 
                src={exercise.videoUrl} 
                alt={exercise.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              {/* Botón Play Superpuesto */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play fill="currentColor" size={20} className="ml-1" />
                </div>
              </div>
              {/* Badge de Dificultad */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  exercise.difficulty === 'Principiante' ? 'bg-green-500 text-black' :
                  exercise.difficulty === 'Intermedio' ? 'bg-yellow-500 text-black' :
                  'bg-red-500 text-white'
                }`}>
                  {exercise.difficulty}
                </span>
              </div>
            </div>

            {/* Info del Ejercicio */}
            <div className="p-4">
              <h3 className="font-bold text-white text-lg mb-1 truncate">{exercise.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Dumbbell size={14} className="text-blue-500" />
                  <span>{exercise.muscle}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Exercises