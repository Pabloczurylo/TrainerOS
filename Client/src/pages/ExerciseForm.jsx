import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom' // <--- Agregamos useParams
import { ArrowLeft, Save, Loader2, Edit } from 'lucide-react'
import { API_URL } from '../config/api'
import ConfirmModal from '../components/ConfirmModal'

const ExerciseForm = () => {
  const navigate = useNavigate()
  const { id } = useParams() // <--- Capturamos el ID de la URL (si existe)
  const isEditing = !!id // Booleano: true si estamos editando, false si es nuevo

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  // Agregamos 'reset' y 'setValue' para rellenar el formulario
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  // 1. Cargar datos si estamos en modo Edición
  useEffect(() => {
    if (isEditing) {
      const loadExercise = async () => {
        setLoadingData(true)
        try {
          const response = await fetch(`${API_URL}/ejercicios`)
          const data = await response.json()
          // Como no tenemos endpoint GET /:id, buscamos en el array (solución temporal)
          // Lo ideal sería: fetch(`${API_URL}/ejercicios/${id}`)
          const found = data.find(ex => ex._id === id)
          
          if (found) {
            // Rellenamos el formulario con los datos encontrados
            reset({
              nombre: found.nombre,
              musculo: found.musculo,
              series: found.series,
              repeticiones: found.repeticiones,
              descanso: found.descanso || '',
              videoUrl: found.videoUrl || ''
            })
          } else {
            alert("Ejercicio no encontrado")
            navigate('/exercises')
          }
        } catch (error) {
          console.error(error)
          alert("Error al cargar datos del ejercicio")
        } finally {
          setLoadingData(false)
        }
      }
      loadExercise()
    }
  }, [id, isEditing, reset, navigate])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // 2. Definimos URL y Método dinámicamente
      const url = isEditing 
        ? `${API_URL}/ejercicios/${id}` 
        : `${API_URL}/ejercicios`
      
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowSuccessModal(true)
      } else {
        const errorData = await response.json()
        alert('Error: ' + (errorData.error || 'No se pudo guardar'))
      }
    } catch (error) {
      console.error(error)
      alert('Error de conexión con el servidor')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    navigate('/exercises')
  }

  if (loadingData) return <div className="p-10 text-center text-white"><Loader2 className="animate-spin inline"/> Cargando datos...</div>

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-white p-4">
      {/* Header Dinámico */}
      <div className="flex items-center gap-4">
        <Link to="/exercises" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#111111] p-6 rounded-xl border border-gray-800 space-y-6">
        
        {/* Nombre */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Nombre del Ejercicio</label>
          <input 
            {...register("nombre", { required: "El nombre es obligatorio" })}
            placeholder="Ej: Press de Banca"
            className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
          />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
        </div>

        {/* Músculo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Grupo Muscular</label>
          <select 
            {...register("musculo", { required: "Selecciona un músculo" })}
            className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
          >
            <option value="">Seleccionar...</option>
            <option value="Pecho">Pecho</option>
            <option value="Espalda">Espalda</option>
            <option value="Piernas">Piernas</option>
            <option value="Brazos">Brazos</option>
            <option value="Hombros">Hombros</option>
            <option value="Core">Core</option>
          </select>
          {errors.musculo && <span className="text-red-500 text-sm">{errors.musculo.message}</span>}
        </div>

        {/* Series y Repeticiones */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Series</label>
            <input 
              type="number"
              {...register("series", { required: "Requerido" })}
              className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Repeticiones</label>
            <input 
              type="text" 
              {...register("repeticiones", { required: "Requerido" })}
              className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Descanso y Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Descanso (seg)</label>
                <input 
                type="text"
                {...register("descanso")}
                className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">URL Video</label>
                <input 
                {...register("videoUrl")}
                placeholder="https://..."
                className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
                />
            </div>
        </div>

        {/* Botón Dinámico */}
        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : (isEditing ? <Edit size={20}/> : <Save size={20} />)}
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar Ejercicio' : 'Guardar Ejercicio')}
        </button>
      </form>

      <ConfirmModal 
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        title={isEditing ? "¡Actualizado!" : "¡Creado!"}
        message={isEditing ? "El ejercicio se actualizó correctamente." : "El ejercicio se guardó correctamente."}
        type="success"
      />
    </div>
  )
}

export default ExerciseForm