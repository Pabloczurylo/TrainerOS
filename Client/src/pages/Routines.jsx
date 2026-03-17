import { useState, useEffect } from 'react'
import { Search, Plus, ClipboardList, MoreHorizontal, Trash2, Edit2, Loader2, RefreshCw, Eye } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom' // <--- 1. Importar useNavigate
import { API_URL } from '../config/api'
import ConfirmModal from '../components/ConfirmModal'

const Routines = () => {
  const navigate = useNavigate() // <--- 2. Inicializar hook
  
  const [routines, setRoutines] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)

  // Estados para el Modal
  const [showModal, setShowModal] = useState(false)
  const [routineToDelete, setRoutineToDelete] = useState(null)

  const fetchRoutines = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/rutinas`)
      const data = await response.json()
      if (Array.isArray(data)) setRoutines(data)
    } catch (error) {
      console.error("Error al cargar:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRoutines() }, [])

  // En lugar de borrar directo, abrimos el modal
  const confirmDelete = (id) => {
    setRoutineToDelete(id)
    setShowModal(true)
    setActiveMenu(null) // Cerramos el menú flotante
  }

  // Esta función se ejecuta solo cuando le das "Sí, eliminar" en el modal
  const handleDelete = async () => {
    if (!routineToDelete) return

    try {
      const response = await fetch(`${API_URL}/rutinas/${routineToDelete}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setRoutines(routines.filter(r => r._id !== routineToDelete))
      } else {
        alert("Error al eliminar")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleMenu = (id) => {
    if (activeMenu === id) setActiveMenu(null)
    else setActiveMenu(id)
  }

  const filteredRoutines = routines.filter(r => 
    r.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-white p-4">
      {/* Header y Buscador */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Mis Rutinas</h1>
          <p className="text-gray-400 text-sm md:text-base">Planes de entrenamiento asignados.</p>
        </div>
        <Link to="/routines/new" className="bg-blue-600 hover:bg-blue-700 text-white p-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 font-bold transition-colors">
          <Plus size={20} /> <span className="hidden md:inline">Nueva Rutina</span>
        </Link>
      </div>

      <div className="bg-[#111111] p-4 rounded-xl border border-gray-800 flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar rutina..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1a1a] p-3 pl-10 rounded-xl border border-gray-800 focus:border-blue-500 outline-none transition-all"
          />
          <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
        </div>
        <button onClick={fetchRoutines} className="p-3 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:text-blue-400 transition-colors">
            <RefreshCw size={20} />
        </button>
      </div>

      {/* Grid de Rutinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
           <div className="col-span-full flex justify-center py-20 text-gray-500">
             <Loader2 className="animate-spin mr-2"/> Cargando rutinas...
           </div>
        ) : filteredRoutines.length === 0 ? (
           <div className="col-span-full text-center py-20 text-gray-500 bg-[#111111] rounded-xl border border-gray-800">
             <ClipboardList size={48} className="mx-auto mb-4 opacity-20"/>
             <p>No hay rutinas creadas aún.</p>
           </div>
        ) : (
            filteredRoutines.map(rutina => (
                <div key={rutina._id} className="bg-[#111111] p-5 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group relative">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg">
                        <ClipboardList size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">{rutina.nombre}</h3>
                        <p className="text-xs text-gray-400">Cliente: ...{rutina.usuarioId.toString().slice(-4)}</p>
                    </div>
                    </div>
                    <button onClick={() => toggleMenu(rutina._id)} className="text-gray-500 hover:text-white"><MoreHorizontal size={20} /></button>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {rutina.descripcion || "Sin descripción"}
                </p>

                <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-sm">
                    <span className="bg-gray-800 px-2 py-1 rounded text-gray-300 text-xs">
                    {rutina.ejerciciosIDs ? rutina.ejerciciosIDs.length : 0} Ejercicios
                    </span>
                    
                    <Link to={`/routines/${rutina._id}`} className="text-blue-400 hover:underline flex items-center gap-1">
                    Ver detalle <Eye size={14}/>
                    </Link>
                </div>

                {activeMenu === rutina._id && (
                    <div className="absolute top-12 right-4 w-40 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                    {/* 3. BOTÓN EDITAR CONECTADO */}
                    <button 
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white text-left transition-colors"
                        onClick={() => navigate(`/routines/edit/${rutina._id}`)} // <--- Navegación al editor
                    >
                        <Edit2 size={16} className="text-blue-500"/> Editar
                    </button>
                    
                    <div className="h-[1px] bg-gray-800"></div>

                    <button 
                        onClick={() => confirmDelete(rutina._id)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 text-left transition-colors"
                    >
                        <Trash2 size={16} /> Eliminar
                    </button>
                    </div>
                )}
                </div>
            ))
        )}
      </div>

      <ConfirmModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Eliminar Rutina"
        message="¿Estás seguro de que quieres eliminar esta rutina? Esta acción no se puede deshacer."
        type="danger" // <--- 4. Actualizado para coincidir con el nuevo ConfirmModal
      />
    </div>
  )
}

export default Routines