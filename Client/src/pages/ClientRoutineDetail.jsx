import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Dumbbell, Clock, Target, AlertCircle, Loader2 } from 'lucide-react'
import { API_URL } from '../config/api'

const ClientRoutineDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // Recibimos la rutina directamente desde el Dashboard
  const { routine } = location.state || {} 
  
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Protección: Si entran por URL directa sin datos, volver al dashboard
  useEffect(() => {
    if (!routine) {
      navigate('/dashboard')
    }
  }, [routine, navigate])

  // 2. Fetch de Ejercicios
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(`${API_URL}/ejercicios`)
        const data = await res.json()
        
        if (routine?.ejerciciosIDs && Array.isArray(routine.ejerciciosIDs)) {
            // Filtramos los que coinciden con los IDs de esta rutina
            const myExercises = data.filter(ex => routine.ejerciciosIDs.includes(ex._id))
            setExercises(myExercises)
        }
      } catch (error) {
        console.error("Error cargando ejercicios:", error)
      } finally {
        setLoading(false)
      }
    }

    if (routine) {
        fetchExercises()
    }
  }, [routine])

  if (!routine) return null

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24 animate-in fade-in duration-500">
      
      {/* Navbar Simple */}
      <div className="flex items-center gap-4 mb-6 pt-2">
        <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-[#111111] border border-gray-800 rounded-lg hover:bg-gray-800 transition"
        >
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Detalle del Plan</h1>
      </div>

      {/* Tarjeta de Resumen (Hero) */}
      <div className="bg-gradient-to-br from-blue-900/40 to-[#111111] border border-blue-500/30 p-6 rounded-2xl mb-8 relative overflow-hidden shadow-lg shadow-blue-900/10">
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 capitalize text-white">{routine.nombre}</h2>
            <p className="text-gray-400 italic mb-4 text-sm border-l-2 border-blue-500 pl-3">
                "{routine.descripcion || "Dale duro a este entrenamiento."}"
            </p>
            
            <div className="flex flex-wrap gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 text-blue-300">
                    <Dumbbell size={14} />
                    <span>{exercises.length} Ejercicios</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 text-green-300">
                    <Clock size={14} />
                    <span>60 min aprox</span>
                </div>
            </div>
        </div>
      </div>

      {/* Lista de Ejercicios (Estilo Cards para Móvil) */}
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 pl-1 text-white">
        <Target className="text-purple-500" size={20} />
        Tu Circuito
      </h3>

      <div className="space-y-4">
        {loading ? (
            <div className="text-center py-12">
                <Loader2 className="animate-spin mx-auto text-blue-500 mb-2" size={32} />
                <p className="text-gray-500 text-sm">Preparando tu rutina...</p>
            </div>
        ) : exercises.length > 0 ? (
            exercises.map((exercise, index) => (
                <div 
                    key={exercise._id} 
                    // Al hacer click, navegamos al detalle pasando el ejercicio
                    onClick={() => navigate('/ejercicio', { state: { exercise } })}
                    className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden flex flex-col md:flex-row group transition-all hover:border-gray-600 cursor-pointer active:scale-[0.99]"
                >
                    
                    {/* Imagen / GIF */}
                    <div className="w-full md:w-32 h-48 md:h-auto bg-gray-900 relative shrink-0">
                        {exercise.gifUrl ? (
                            <img 
                                src={exercise.gifUrl} 
                                alt={exercise.name} 
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-700">
                                <Dumbbell size={32} />
                            </div>
                        )}
                        {/* Badge de número */}
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full shadow-lg border border-white/10">
                            {index + 1}
                        </div>
                    </div>
                    
                    {/* Información */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="mb-3">
                            <h4 className="font-bold text-lg capitalize text-white mb-1">{exercise.nombre}</h4>
                            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                                {exercise.musculo ? `Enfoque en: ${exercise.musculo}` : "Sigue la técnica correcta."}
                            </p>
                        </div>

                        {/* Datos técnicos (Reps/Series) */}
                        <div className="flex flex-wrap gap-2 text-xs font-semibold">
                            <span className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-md border border-gray-700">
                                {exercise.series || 4} Series
                            </span>
                            <span className="bg-blue-900/20 text-blue-300 px-3 py-1.5 rounded-md border border-blue-500/20">
                                {exercise.repeticiones || 12} Repeticiones
                            </span>
                            {exercise.descanso && (
                                <span className="bg-purple-900/20 text-purple-300 px-3 py-1.5 rounded-md border border-purple-500/20">
                                    {exercise.descanso}" Descanso
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="p-6 bg-yellow-900/10 border border-yellow-500/20 rounded-xl flex flex-col items-center text-center gap-2">
                <AlertCircle className="text-yellow-500" />
                <p className="text-yellow-500 font-medium">Sin ejercicios</p>
                <p className="text-sm text-gray-400">Esta rutina está vacía. Consulta a tu entrenador.</p>
            </div>
        )}
      </div>
    </div>
  )
}

export default ClientRoutineDetail