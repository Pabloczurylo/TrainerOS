import { useState, useEffect } from 'react'
import { Users, Dumbbell, TrendingUp, Plus, Calendar, ClipboardList, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { API_URL } from '../config/api'
import Card from '../components/ui/Card'

// 1. IMPORTAMOS EL STORE DE AUTENTICACIÓN Y LA VISTA DE CLIENTE
import { useAuthStore } from "../store/useAuthStore";
import UserDashboard from './UserDashboard'

const Dashboard = () => {
  // 2. OBTENEMOS EL USUARIO ACTUAL
  const { user } = useAuthStore()
  
  const [metrics, setMetrics] = useState({ users: 0, routines: 0, exercises: 0 })
  // NUEVO ESTADO PARA LA LISTA DE ACTIVIDAD
  const [activities, setActivities] = useState([]) 
  const [loading, setLoading] = useState(true)

  // --- FUNCIÓN UTILITARIA: Extraer tiempo desde ID de MongoDB ---
  const getTimeAgo = (mongoId) => {
    if (!mongoId) return "Recientemente";
    
    // Los primeros 8 caracteres del ObjectId son el timestamp
    const timestamp = parseInt(mongoId.substring(0, 8), 16) * 1000;
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) return "Hace un momento";
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`;
    return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
  };

  // 3. LÓGICA DE SEMÁFORO
  if (user && !user.isAdmin) {
    return <UserDashboard />
  }

  // --- A PARTIR DE AQUÍ, SOLO SE EJECUTA SI ERES ADMIN ---

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?.isAdmin) return; 

      try {
        const [resUsers, resRoutines, resExercises] = await Promise.all([
          fetch(`${API_URL}/users`),
          fetch(`${API_URL}/rutinas`),
          fetch(`${API_URL}/ejercicios`)
        ])
        const users = await resUsers.json()
        const routines = await resRoutines.json()
        const exercises = await resExercises.json()

        // 1. SETEAR MÉTRICAS
        setMetrics({
          users: Array.isArray(users) ? users.length : 0,
          routines: Array.isArray(routines) ? routines.length : 0,
          exercises: Array.isArray(exercises) ? exercises.length : 0
        })

        // 2. PROCESAR ACTIVIDAD RECIENTE (Mezclamos Clientes y Rutinas)
        let newActivities = [];

        if (Array.isArray(users)) {
            // Filtramos solo los que NO son admin para que parezca actividad de clientes
            const recentUsers = users
                .filter(u => !u.isAdmin) 
                .map(u => ({
                    id: u._id || u.id,
                    text: `Nuevo cliente registrado: ${u.nombre}`,
                    rawDate: parseInt((u._id || u.id).substring(0, 8), 16), // Timestamp para ordenar
                    time: getTimeAgo(u._id || u.id),
                    type: "success" // Verde
                }));
            newActivities = [...newActivities, ...recentUsers];
        }

        if (Array.isArray(routines)) {
            const recentRoutines = routines.map(r => ({
                id: r._id || r.id,
                text: `Nueva rutina creada: ${r.nombre}`,
                rawDate: parseInt((r._id || r.id).substring(0, 8), 16),
                time: getTimeAgo(r._id || r.id),
                type: "info" // Azul
            }));
            newActivities = [...newActivities, ...recentRoutines];
        }

        // 3. ORDENAR POR FECHA (Más reciente primero) Y TOMAR LOS ÚLTIMOS 5
        newActivities.sort((a, b) => b.rawDate - a.rawDate);
        setActivities(newActivities.slice(0, 5));

      } catch (error) {
        console.error("Error cargando dashboard:", error)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [user])

  const stats = [
    { label: 'Clientes Registrados', value: metrics.users, icon: Users, color: 'text-blue-500', trend: 'Total histórico' },
    { label: 'Rutinas Activas', value: metrics.routines, icon: ClipboardList, color: 'text-purple-500', trend: 'Asignadas' },
    { label: 'Ejercicios en Banco', value: metrics.exercises, icon: Dumbbell, color: 'text-green-500', trend: 'Disponibles' },
  ]

  if (loading && user?.isAdmin) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2" size={40} />
        <p className="text-xl font-medium">Cargando métricas...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Hola, {user?.nombre || 'Admin'} 👋</h1>
          <p className="text-gray-400 mt-1">Aquí tienes el resumen de tu día.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg">
          <p className="text-white font-medium text-sm">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 flex items-start justify-between group hover:border-blue-500/30 transition-all cursor-default">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full border border-gray-700">
                <TrendingUp size={12} />
                {stat.trend}
              </span>
            </div>
            <div className={`p-4 rounded-2xl bg-gray-900 border border-gray-800 ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Accesos Rápidos */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white">Accesos Rápidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Link to="/clients/new" className="group">
              <div className="p-6 h-full bg-gray-900 border border-gray-800 rounded-2xl hover:border-blue-500/50 hover:bg-blue-900/10 transition-all flex items-center gap-5 cursor-pointer relative overflow-hidden">
                <div className="bg-blue-600 rounded-xl p-4 text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20 z-10">
                  <Plus size={28} />
                </div>
                <div className="z-10">
                  <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">Nuevo Cliente</h3>
                  <p className="text-sm text-gray-400 mt-1">Registrar usuario</p>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
              </div>
            </Link>

            <Link to="/routines/new" className="group">
              <div className="p-6 h-full bg-gray-900 border border-gray-800 rounded-2xl hover:border-purple-500/50 hover:bg-purple-900/10 transition-all flex items-center gap-5 cursor-pointer relative overflow-hidden">
                <div className="bg-purple-600 rounded-xl p-4 text-white group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20 z-10">
                  <ClipboardList size={28} />
                </div>
                <div className="z-10">
                  <h3 className="font-bold text-white text-lg group-hover:text-purple-400 transition-colors">Crear Rutina</h3>
                  <p className="text-sm text-gray-400 mt-1">Diseñar plan</p>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              </div>
            </Link>

          </div>

          {/* Banner de Agenda */}
          <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-gray-800 rounded-full text-gray-300 border border-gray-700">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Agenda Semanal</h3>
                <p className="text-gray-400 text-sm">No tienes revisiones pendientes para hoy.</p>
              </div>
          </div>
        </div>

        {/* Actividad Reciente (REAL) */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Últimos Movimientos</h2>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden min-h-[300px]">
            {activities.length > 0 ? (
                activities.map((activity, index) => (
                <div key={activity.id} className={`p-4 flex gap-4 items-start hover:bg-gray-800/50 transition-colors ${index !== activities.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    <div className={`mt-2 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                    activity.type === 'info' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-gray-500'
                    }`} />
                    <div>
                    <p className="text-sm text-gray-200 font-medium leading-snug">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1.5 font-mono">{activity.time}</p>
                    </div>
                </div>
                ))
            ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                    No hay actividad reciente registrada.
                </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard