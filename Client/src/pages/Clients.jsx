import { useEffect, useState } from 'react'
import { Search, Plus, MoreVertical, Trash2, Shield, User, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { API_URL } from '../config/api'
import Card from '../components/ui/Card' 
import ConfirmModal from '../components/ConfirmModal'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [loading, setLoading] = useState(true)

  // Estado para el Modal
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    onConfirm: null
  })

  // Cargar clientes
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_URL}/users`) 
        if (!response.ok) throw new Error('Error al obtener clientes')
        const data = await response.json()
        setClients(data)
      } catch (error) {
        console.error("Error de conexión:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleDocClick = (e) => {
      if (e.target.closest && (
        e.target.closest('[data-menu]') ||
        e.target.closest('[data-menu-toggle]')
      )) return
      setOpenMenu(null)
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  const toggleMenu = (id) => setOpenMenu(prev => prev === id ? null : id)

  // Lógica de Eliminación
  const confirmDelete = (id) => {
    setOpenMenu(null); 
    setModalConfig({
        isOpen: true,
        type: 'danger',
        title: 'Eliminar Cliente',
        message: '¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.',
        onConfirm: () => executeDelete(id)
    });
  }

  const executeDelete = async (id) => {
    try {
      // CORRECCIÓN: Agregamos "/users" antes del ID
      const response = await fetch(`${API_URL}/users/${id}`, { 
        method: 'DELETE'
      })

      if (response.ok) {
        setClients(prev => prev.filter(c => (c._id !== id && c.id !== id)))
        setModalConfig({
            isOpen: true,
            type: 'success',
            title: 'Cliente Eliminado',
            message: 'El cliente ha sido eliminado correctamente del sistema.',
            onConfirm: () => {} 
        });
      } else {
        throw new Error('Error al eliminar');
      }
    } catch (error) {
      setModalConfig({
        isOpen: true,
        type: 'danger',
        title: 'Error',
        message: 'No se pudo conectar con el servidor para eliminar el cliente.',
        onConfirm: () => {}
      });
    }
  }

  // Filtro de búsqueda
  const q = searchTerm.trim().toLowerCase()
  const filteredClients = q
    ? clients.filter(c => (
        (c.nombre && c.nombre.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) 
      ))
    : clients

  if (loading) return <div className="text-white p-8">Cargando clientes...</div>

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <ConfirmModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />

      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Clientes</h1>
          <p className="text-gray-400">Administra el acceso y perfiles de tus alumnos.</p>
        </div>
        <Link 
          to="/clients/new" 
          className="w-full sm:w-auto justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus size={20} />
          Nuevo Cliente
        </Link>
      </div>

      {/* Barra de Búsqueda */}
      <Card className="p-4 bg-[#111111] border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o email..." 
            className="w-full bg-[#1a1a1a] border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </Card>

      {/* --- VISTA MÓVIL (TARJETAS) --- */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {filteredClients.map((client) => {
            const clientId = client._id || client.id;
            return (
                <div key={clientId} className="bg-[#111111] border border-gray-800 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${client.isAdmin ? 'bg-purple-900/20 text-purple-400' : 'bg-blue-900/20 text-blue-400'}`}>
                                {client.isAdmin ? <Shield size={20} /> : <User size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg leading-tight">{client.nombre}</h3>
                                <p className="text-sm text-gray-500">{client.isAdmin ? 'Administrador' : 'Cliente'}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-[#1a1a1a] p-3 rounded-lg border border-gray-800/50">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Email</p>
                        <p className="text-gray-300 text-sm truncate">{client.email}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                         {/* BOTÓN EDITAR (Móvil) */}
                         <Link 
                            to={`/clients/new?id=${clientId}`}
                            className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium text-sm"
                         >
                             <Pencil size={16} />
                             Editar Datos
                         </Link>

                         {/* BOTÓN ELIMINAR (Móvil) */}
                         <button 
                            onClick={() => confirmDelete(clientId)}
                            className="w-full py-2.5 bg-red-900/10 hover:bg-red-900/20 text-red-500 border border-red-900/20 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium text-sm"
                         >
                            <Trash2 size={16} />
                            Eliminar Cliente
                         </button>
                    </div>
                </div>
            )
        })}
      </div>

      {/* --- VISTA DESKTOP (TABLA) --- */}
      <Card className="hidden sm:block p-0 overflow-hidden border-gray-800 bg-[#111111]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400"> 
            <thead className="bg-[#1a1a1a] text-gray-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Contacto</th>
                <th className="px-6 py-4 font-semibold">Rol</th>
                <th className="px-6 py-4 text-right font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredClients.map((client) => {
                const clientId = client._id || client.id;
                
                return (
                  <tr key={clientId} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${client.isAdmin ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400'}`}>
                            {client.isAdmin ? <Shield size={14} /> : <User size={14} />}
                        </div>
                        {client.nombre} 
                    </td>
                    <td className="px-6 py-4">{client.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          client.isAdmin 
                          ? 'bg-purple-900/10 text-purple-400 border-purple-500/20' 
                          : 'bg-blue-900/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {client.isAdmin ? 'Admin' : 'Cliente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        data-menu-toggle 
                        onClick={() => toggleMenu(clientId)} 
                        className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {openMenu === clientId && (
                        <div data-menu className="absolute right-6 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                           <div className="p-1">
                               {/* OPCIÓN EDITAR (Desktop) */}
                               <Link 
                                 to={`/clients/new?id=${clientId}`}
                                 className="w-full text-left px-3 py-2.5 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                               >
                                 <Pencil size={16} />
                                 Editar
                               </Link>

                               <button 
                                 onClick={() => confirmDelete(clientId)} 
                                 className="w-full text-left px-3 py-2.5 hover:bg-red-900/20 text-red-400 hover:text-red-300 rounded-lg transition-colors flex items-center gap-2 text-sm"
                               >
                                 <Trash2 size={16} />
                                 Eliminar
                               </button>
                           </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Clients