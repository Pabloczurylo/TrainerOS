import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Dumbbell, Calendar, User, Loader2 } from 'lucide-react'
import { API_URL } from '../config/api'

const RoutineDetail = () => {
  const { id } = useParams() // Obtenemos el ID de la URL
  const [rutina, setRutina] = useState(null)
  const [ejerciciosDetalle, setEjerciciosDetalle] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Cargar Rutinas y Ejercicios (En paralelo para ser rápidos)
        const [resRutinas, resEjercicios] = await Promise.all([
          fetch(`${API_URL}/rutinas`),
          fetch(`${API_URL}/ejercicios`)
        ])

        const rutinasData = await resRutinas.json()
        const ejerciciosData = await resEjercicios.json()

        // 2. Encontrar la rutina específica
        const foundRutina = rutinasData.find(r => r._id === id)
        
        if (foundRutina) {
          setRutina(foundRutina)
          
          // 3. Filtrar los ejercicios que pertenecen a esta rutina
          // (Comparamos los IDs que tiene la rutina con los IDs de todos los ejercicios)
          if (foundRutina.ejerciciosIDs && Array.isArray(foundRutina.ejerciciosIDs)) {
             const detalles = ejerciciosData.filter(ej => 
                foundRutina.ejerciciosIDs.includes(ej._id)
             )
             setEjerciciosDetalle(detalles)
          }
        }
      } catch (error) {
        console.error("Error cargando detalles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <div className="p-10 text-center text-white"><Loader2 className="animate-spin inline mr-2"/> Cargando detalle...</div>
  
  if (!rutina) return <div className="p-10 text-center text-white">Rutina no encontrada.</div>

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-white p-4">
      {/* Header con botón volver */}
      <div className="flex items-start gap-4">
        <Link to="/routines" className="p-2 bg-[#111111] border border-gray-800 hover:bg-gray-800 rounded-lg transition-colors mt-1">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">{rutina.nombre}</h1>
          <p className="text-gray-400 mt-2">{rutina.descripcion || "Sin descripción adicional."}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111111] p-4 rounded-xl border border-gray-800 flex items-center gap-3">
          <div className="p-2 bg-blue-900/20 text-blue-400 rounded-lg"><User size={20}/></div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Cliente ID</p>
            <p className="font-mono text-sm">...{rutina.usuarioId.toString().slice(-6)}</p>
          </div>
        </div>
        <div className="bg-[#111111] p-4 rounded-xl border border-gray-800 flex items-center gap-3">
          <div className="p-2 bg-purple-900/20 text-purple-400 rounded-lg"><Dumbbell size={20}/></div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Ejercicios</p>
            <p className="font-bold">{ejerciciosDetalle.length} asignados</p>
          </div>
        </div>
        <div className="bg-[#111111] p-4 rounded-xl border border-gray-800 flex items-center gap-3">
          <div className="p-2 bg-green-900/20 text-green-400 rounded-lg"><Calendar size={20}/></div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Creación</p>
            {/* Si el backend guardara fecha, la pondríamos aquí. Por ahora estático */}
            <p className="text-sm">Reciente</p>
          </div>
        </div>
      </div>

      {/* Tabla de Ejercicios de la Rutina */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
            Lista de Ejercicios
        </h2>
        
        <div className="bg-[#111111] rounded-xl border border-gray-800 overflow-hidden">
            {ejerciciosDetalle.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Esta rutina no tiene ejercicios asignados.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#1a1a1a] text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="p-4 pl-6">Ejercicio</th>
                                <th className="p-4">Músculo</th>
                                <th className="p-4">Series/Reps</th>
                                <th className="p-4">Descanso</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {ejerciciosDetalle.map(ex => (
                                <tr key={ex._id} className="hover:bg-gray-900/50">
                                    <td className="p-4 pl-6 font-medium">{ex.nombre}</td>
                                    <td className="p-4 text-sm text-gray-400">
                                        <span className="bg-gray-800 px-2 py-1 rounded text-xs">{ex.musculo}</span>
                                    </td>
                                    <td className="p-4 text-sm font-mono text-blue-300">
                                        {ex.series} x {ex.repeticiones}
                                    </td>
                                    <td className="p-4 text-sm text-gray-400">
                                        {ex.descanso ? `${ex.descanso}"` : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default RoutineDetail