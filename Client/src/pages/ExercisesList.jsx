import { useState, useEffect } from 'react'
import { Search, Plus, Dumbbell, MoreHorizontal, Edit2, Trash2, RefreshCw, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom' 
import { API_URL } from '../config/api'
import ConfirmModal from '../components/ConfirmModal'

const ExercisesList = () => {
  const navigate = useNavigate() // <--- Inicializamos el hook para poder redirigir
  
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  // Estados para el Modal de Eliminación
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // 1. Función para Cargar ejercicios
  const fetchExercises = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/ejercicios`)
      const data = await response.json()
      if (Array.isArray(data)) {
        setExercises(data)
      } else {
        console.error("El formato de respuesta no es un array:", data)
      }
    } catch (error) {
      console.error("Error cargando ejercicios:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExercises()
  }, [])

  // 2. Función "Gatillo": Solo abre el modal y guarda el ID
  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowModal(true)
    setActiveMenu(null) // Cerramos el menú flotante
  }

  // 3. Función Real: Borra el ejercicio de la BD
  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`${API_URL}/ejercicios/${deleteId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Actualizamos la lista visualmente
        setExercises(exercises.filter(ex => ex._id !== deleteId))
      } else {
        alert("Error al eliminar")
      }
    } catch (error) {
      console.error(error)
      alert("Error de conexión al intentar eliminar")
    }
  }

  const toggleMenu = (id) => {
    if (activeMenu === id) setActiveMenu(null)
    else setActiveMenu(id)
  }

  // Filtrado
  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ex.musculo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || ex.musculo === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Core', 'Hombros']

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-white p-4">
      {/* Encabezado */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Banco de Ejercicios</h1>
        </div>
        <Link 
          to="/exercises/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 font-bold transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus size={20} /> 
          <span className="hidden md:inline">Nuevo</span>
        </Link>
      </div>

      {/* Buscador y Filtros */}
      <div className="bg-[#111111] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1a1a] p-3 pl-10 rounded-xl border border-gray-800 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
          />
          <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
        </div>
        <button onClick={fetchExercises} className="hidden md:flex items-center justify-center p-3 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:text-blue-400 transition-colors" title="Recargar lista">
            <RefreshCw size={20} />
        </button>
      </div>

       {/* Filtros de Categoría */}
       <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm border whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-900/30 text-blue-400 border-blue-500' 
                  : 'bg-[#1a1a1a] text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      {/* Lista (Tabla) */}
      <div className="bg-[#111111] rounded-xl border border-gray-800 overflow-visible min-h-[400px]">
        
        {loading ? (
            <div className="p-10 text-center text-gray-400 flex flex-col items-center">
                <Loader2 className="animate-spin mb-2" size={30} />
                <p>Cargando ejercicios...</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#1a1a1a] text-gray-400 uppercase text-xs">
                <tr>
                    <th className="p-4 pl-6">Nombre</th>
                    <th className="p-4 hidden md:table-cell">Grupo</th>
                    <th className="p-4 hidden md:table-cell">Series/Reps</th>
                    <th className="p-4 text-right pr-6"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                {filteredExercises.map(ex => (
                    <tr key={ex._id} className="hover:bg-gray-900/50 relative group">
                    <td className="p-4 pl-6 font-semibold">
                        <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-800 rounded-lg text-gray-400 hidden sm:block">
                            <Dumbbell size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white">{ex.nombre}</span>
                            <span className="text-xs text-blue-400 md:hidden">{ex.musculo}</span>
                        </div>
                        </div>
                    </td>
                    
                    <td className="p-4 text-sm text-gray-300 hidden md:table-cell">
                        <span className="px-2 py-1 rounded-md bg-gray-800 border border-gray-700 text-xs">
                        {ex.musculo}
                        </span>
                    </td>
                    <td className="p-4 text-sm text-gray-300 hidden md:table-cell">
                        {ex.series} x {ex.repeticiones}
                    </td>
                    
                    <td className="p-4 pr-6 text-right relative">
                        <button 
                        onClick={() => toggleMenu(ex._id)}
                        className={`p-2 rounded-lg transition-colors ${activeMenu === ex._id ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
                        >
                        <MoreHorizontal size={20}/>
                        </button>

                        {/* Menú Flotante */}
                        {activeMenu === ex._id && (
                        <div className="absolute right-10 top-2 w-40 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                            {/* BOTÓN EDITAR CONECTADO */}
                            <button 
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white text-left transition-colors"
                            onClick={() => navigate(`/exercises/edit/${ex._id}`)} // <--- Navegación al formulario de edición
                            >
                            <Edit2 size={16} className="text-blue-500"/>
                            Editar
                            </button>
                            
                            <div className="h-[1px] bg-gray-800"></div>
                            
                            {/* Botón Eliminar */}
                            <button 
                            className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 text-left transition-colors"
                            onClick={() => confirmDelete(ex._id)} 
                            >
                            <Trash2 size={16} />
                            Eliminar
                            </button>
                        </div>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        
        {!loading && filteredExercises.length === 0 && (
           <div className="p-8 text-center text-gray-500">
             No se encontraron ejercicios. ¡Prueba agregar uno nuevo!
           </div>
        )}
      </div>

      {/* Renderizamos el Modal al final */}
      <ConfirmModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Eliminar Ejercicio"
        message="¿Estás seguro de que quieres eliminar este ejercicio? Esta acción no se puede deshacer."
        type="danger"
      />
    </div>
  )
}

export default ExercisesList