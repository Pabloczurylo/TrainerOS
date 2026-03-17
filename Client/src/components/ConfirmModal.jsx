import { AlertTriangle, X, CheckCircle } from 'lucide-react'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
  if (!isOpen) return null

  // Definimos estilos según el tipo (danger = borrar, success = guardado exitoso)
  const isSuccess = type === 'success'
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform scale-100 transition-all">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {/* Ícono dinámico */}
            {isSuccess ? <CheckCircle className="text-green-500" size={20} /> : <AlertTriangle className="text-red-500" size={20} />}
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-6">
          <p className="text-gray-300">{message}</p>
        </div>

        {/* Botones */}
        <div className="p-4 bg-[#161616] flex justify-end gap-3 border-t border-gray-800">
          
          {/* El botón Cancelar solo aparece si NO es éxito */}
          {!isSuccess && (
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cancelar
            </button>
          )}

          <button 
            onClick={() => {
              if (onConfirm) onConfirm()
              onClose()
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white shadow-lg transition-colors ${
              isSuccess 
                ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
                : 'bg-red-600 hover:bg-red-700 shadow-red-900/20'    
            }`}
          >
            {isSuccess ? 'Entendido' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal