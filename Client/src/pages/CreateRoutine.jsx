import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom' // <--- Importamos useParams
import { ArrowLeft, Save, Loader2, Search, CheckCircle, Circle, Edit } from 'lucide-react'
import { API_URL } from '../config/api'
import ConfirmModal from '../components/ConfirmModal'

const CreateRoutine = () => {
  const navigate = useNavigate()
  const { id } = useParams() // <--- Capturamos ID
  const isEditing = !!id

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
  
  // Estados
  const [clients, setClients] = useState([])
  const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([]) 
  const [loadingData, setLoadingData] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Carga inicial de datos
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Cargamos Usuarios, Ejercicios y (si editamos) Rutinas
        const promises = [
          fetch(`${API_URL}/users`),
          fetch(`${API_URL}/ejercicios`)
        ]
        
        // Si estamos editando, traemos también las rutinas para buscar la actual
        if (isEditing) {
           promises.push(fetch(`${API_URL}/rutinas`))
        }

        const responses = await Promise.all(promises)
        const usersData = await responses[0].json()
        const exercisesData = await responses[1].json()

        if (Array.isArray(usersData)) setClients(usersData)
        if (Array.isArray(exercisesData)) setExercises(exercisesData)

        // 2. Si estamos editando, buscamos la rutina específica y rellenamos
        if (isEditing) {
            const rutinasData = await responses[2].json()
            const found = rutinasData.find(r => r._id === id)
            
            if (found) {
                // Rellenamos campos de texto
                reset({
                    nombre: found.nombre,
                    descripcion: found.descripcion || '',
                    usuarioId: found.usuarioId // Esto seleccionará al cliente en el select
                })
                // Rellenamos los ejercicios seleccionados
                if (found.ejerciciosIDs && Array.isArray(found.ejerciciosIDs)) {
                    setSelectedExercises(found.ejerciciosIDs)
                }
            } else {
                alert("Rutina no encontrada")
                navigate('/routines')
            }
        }

      } catch (error) {
        console.error("Error cargando datos:", error)
        alert("Error al cargar datos")
      } finally {
        setLoadingData(false)
      }
    }
    loadData()
  }, [id, isEditing, navigate, reset])

  const toggleExercise = (exId) => {
    if (selectedExercises.includes(exId)) {
      setSelectedExercises(selectedExercises.filter(id => id !== exId))
    } else {
      setSelectedExercises([...selectedExercises, exId])
    }
  }

  const onSubmit = async (data) => {
    if (selectedExercises.length === 0) {
      alert("Selecciona al menos un ejercicio.")
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        usuarioId: data.usuarioId,
        ejerciciosIDs: selectedExercises 
      }

      // 3. URL y Método dinámicos
      const url = isEditing 
        ? `${API_URL}/rutinas/${id}`
        : `${API_URL}/rutinas`
      
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setShowSuccessModal(true)
      } else {
        const errorData = await response.json()
        alert('Error: ' + (errorData.error || 'No se pudo guardar'))
      }
    } catch (error) {
      console.error(error)
      alert('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    navigate('/routines')
  }

  const filteredExercises = exercises.filter(ex => 
    ex.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.musculo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loadingData) return <div className="p-10 text-center text-white"><Loader2 className="animate-spin inline"/> Cargando...</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white p-4">
      <div className="flex items-center gap-4">
        <Link to="/routines" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">{isEditing ? 'Editar Rutina' : 'Nueva Rutina'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Sección 1: Datos */}
        <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 space-y-6">
          <h2 className="text-lg font-semibold text-blue-400">1. Información General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Nombre</label>
              <input 
                {...register("nombre", { required: "Ponle un nombre" })}
                className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
              />
              {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Cliente</label>
              <select 
                {...register("usuarioId", { required: "Selecciona un cliente" })}
                className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
              >
                <option value="">Seleccionar...</option>
                {clients.map(c => (
                  <option key={c._id} value={c._id}>{c.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Descripción</label>
            <textarea 
              {...register("descripcion")}
              rows="3"
              className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Sección 2: Ejercicios */}
        <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 space-y-6">
          <div className="flex justify-between items-center">
             <h2 className="text-lg font-semibold text-blue-400">2. Seleccionar Ejercicios</h2>
             <span className="text-sm bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
               {selectedExercises.length} seleccionados
             </span>
          </div>

          <div className="relative">
            <input
                type="text"
                placeholder="Buscar ejercicio..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] p-2 pl-9 rounded-lg border border-gray-800 text-sm focus:border-blue-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredExercises.map(ex => {
              const isSelected = selectedExercises.includes(ex._id)
              return (
                <div 
                  key={ex._id}
                  onClick={() => toggleExercise(ex._id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected ? 'bg-blue-900/20 border-blue-500' : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div>
                    <h4 className={`font-medium ${isSelected ? 'text-blue-300' : 'text-gray-300'}`}>{ex.nombre}</h4>
                    <p className="text-xs text-gray-500">{ex.musculo}</p>
                  </div>
                  {isSelected 
                    ? <CheckCircle size={20} className="text-blue-500" />
                    : <Circle size={20} className="text-gray-600 group-hover:text-gray-400" />
                  }
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            disabled={isSubmitting}
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : (isEditing ? <Edit size={20}/> : <Save size={20} />)}
            {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar Rutina' : 'Crear Rutina')}
          </button>
        </div>

      </form>

      <ConfirmModal 
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        onConfirm={handleSuccessClose}
        title={isEditing ? "¡Actualizada!" : "¡Creada!"}
        message={isEditing ? "La rutina ha sido actualizada correctamente." : "La rutina ha sido creada correctamente."}
        type="success"
      />
    </div>
  )
}

export default CreateRoutine