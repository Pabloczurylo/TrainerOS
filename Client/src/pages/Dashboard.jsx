import { useState, useEffect } from 'react'
import { Users, Activity, History, TrendingUp, TrendingDown, Bell, HelpCircle, Search } from 'lucide-react'
import { API_URL } from '../config/api'
import { useAuthStore } from "../store/useAuthStore"
import UserDashboard from './UserDashboard'

const Dashboard = () => {
  const { user } = useAuthStore()
  
  const [metrics, setMetrics] = useState({ users: 1284, income: "€12,500", newUsers: "+45" })
  const [activities] = useState([
    { id: '1', cliente: 'Ana Martínez', initials: 'AM', colorAvatar: 'bg-blue-900 text-blue-300', accion: 'Completó rutina "Pierna A"', fecha: 'Hace 15 min', estado: 'COMPLETADO', colorEstado: 'green' },
    { id: '2', cliente: 'Juan Rodríguez', initials: 'JR', colorAvatar: 'bg-yellow-900 text-yellow-300', accion: 'Nuevo registro de usuario', fecha: 'Hace 2 horas', estado: 'NUEVO', colorEstado: 'blue' },
    { id: '3', cliente: 'Laura Costa', initials: 'LC', colorAvatar: 'bg-purple-900 text-purple-300', accion: 'Actualizó objetivos', fecha: 'Hace 4 horas', estado: 'PENDIENTE', colorEstado: 'gray' },
    { id: '4', cliente: 'Daniel Blanco', initials: 'DB', colorAvatar: 'bg-pink-900 text-pink-300', accion: 'Canceló suscripción', fecha: 'Ayer', estado: 'CANCELADO', colorEstado: 'red' }
  ])

  if (user && !user.isAdmin) {
    return <UserDashboard />
  }

  // Carga de datos reales - Se puede integrar con `activities` si se desea 
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?.isAdmin) return; 
      try {
        const [resUsers] = await Promise.all([
          fetch(`${API_URL}/users`)
        ]);
        const users = await resUsers.json();

        // Actualiza con datos reales si existen
        if (Array.isArray(users) && users.length > 0) {
            setMetrics(prev => ({ ...prev, users: users.length }));
        }
      } catch (error) {
        console.error("Error cargando dashboard:", error)
      }
    }
    loadDashboardData()
  }, [user])

  const getBadgeClass = (color) => {
    switch (color) {
      case 'green': return 'bg-[#052e16] text-[#10b981] border-[#10b981]/20';
      case 'blue': return 'bg-[#1e3a8a]/30 text-[#3b82f6] border-[#3b82f6]/20';
      case 'red': return 'bg-[#450a0a] text-[#ef4444] border-[#ef4444]/20';
      case 'gray': default: return 'bg-[#1f2937] text-gray-400 border-gray-600/30';
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full text-white pb-10">
      
      {/* HEADER TOP */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <h1 className="text-2xl font-bold">Panel de Control</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-[#181f30] border border-[#2a3143] text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors border border-[#2a3143] bg-[#181f30]">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors border border-[#2a3143] bg-[#181f30]">
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="bg-[#2d68f8] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg shadow-blue-900/20 mb-6 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Mejora tu plan para obtener beneficios</h2>
          <p className="text-blue-100 text-sm md:text-base">Obtén acceso a herramientas avanzadas de análisis, gestión de grupos ilimitada y soporte prioritario 24/7.</p>
        </div>
        <button className="bg-white text-[#2d68f8] px-6 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-colors whitespace-nowrap shadow-sm relative z-10">
          Mejorar Plan
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="border border-[#1e293b] bg-[#131826] p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Clientes Activos</p>
            <div className="p-2 rounded-lg bg-[#064e3b]">
              <Users className="text-[#10b981]" size={20} />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <h3 className="text-3xl font-bold text-white">{metrics.users !== null ? metrics.users.toLocaleString() : '1,284'}</h3>
            <span className="text-[#10b981] text-sm font-bold mb-1 flex items-center gap-1">
              <TrendingUp size={14} className="stroke-[3]" /> +12%
            </span>
          </div>
          <p className="text-[#475569] text-xs font-semibold">vs. el mes anterior</p>
        </div>
        
        {/* Card 2 */}
        <div className="border border-[#1e293b] bg-[#131826] p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Ingresos Mensuales</p>
            <div className="p-2 rounded-lg bg-[#1e3a8a]">
              <Activity className="text-[#60a5fa]" size={20} />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <h3 className="text-3xl font-bold text-white">{metrics.income}</h3>
            <span className="text-[#10b981] text-sm font-bold mb-1 flex items-center gap-1">
              <TrendingUp size={14} className="stroke-[3]" /> +8%
            </span>
          </div>
          <p className="text-[#475569] text-xs font-semibold">vs. el mes anterior</p>
        </div>

        {/* Card 3 */}
        <div className="border border-[#1e293b] bg-[#131826] p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-400 text-sm font-medium">Nuevos Registros</p>
            <div className="p-2 rounded-lg bg-[#451a03]">
              <History className="text-[#f97316]" size={20} />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <h3 className="text-3xl font-bold text-white">{metrics.newUsers}</h3>
            <span className="text-[#f97316] text-sm font-bold mb-1 flex items-center gap-1">
              <TrendingDown size={14} className="stroke-[3]" /> -2%
            </span>
          </div>
          <p className="text-[#475569] text-xs font-semibold">vs. el mes anterior</p>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COL: Actividad Reciente */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2 px-1">
            <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
            <button className="text-[#3b82f6] text-sm hover:underline font-bold">Ver todo</button>
          </div>
          <div className="border border-[#1e293b] bg-[#131826] rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-[#1e293b]">
                  <th className="px-6 py-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Acción</th>
                  <th className="px-6 py-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b]">
                {activities.map((act) => (
                  <tr key={act.id} className="hover:bg-[#1a2133]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${act.colorAvatar} flex items-center justify-center text-xs font-bold`}>
                          {act.initials}
                        </div>
                        <span className="text-white text-sm font-bold">{act.cliente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm font-medium">{act.accion}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm font-medium">{act.fecha}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${getBadgeClass(act.colorEstado)}`}>
                        {act.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COL: Próximas Sesiones + Estado del Sistema */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Próximas Sesiones */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 px-1">Próximas Sesiones</h2>
            <div className="border border-[#1e293b] bg-[#131826] rounded-2xl p-1 shadow-sm">
              
              {/* Session 1 */}
              <div className="flex items-start gap-4 p-4 border-b border-[#1e293b] hover:bg-[#1a2133]/50 rounded-t-xl transition-colors">
                <div className="bg-[#2d68f8] rounded-xl p-2 flex flex-col items-center justify-center min-w-[50px]">
                  <span className="text-blue-200 text-[10px] font-bold uppercase">Oct</span>
                  <span className="text-white font-bold text-lg leading-none mt-1">12</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Entrenamiento HIIT</h4>
                  <p className="text-[#a1a1aa] text-xs mt-1">10:00 - 11:30 | Sala 3</p>
                  <div className="flex items-center gap-1.5 mt-2 text-[#71717a] text-xs font-bold">
                    <Users size={12} />
                    <span>12 ASISTENTES</span>
                  </div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="flex items-start gap-4 p-4 hover:bg-[#1a2133]/50 transition-colors">
                <div className="rounded-xl p-2 flex flex-col items-center justify-center min-w-[50px] bg-[#1e293b]">
                  <span className="text-gray-400 text-[10px] font-bold uppercase">Oct</span>
                  <span className="text-white font-bold text-lg leading-none mt-1">14</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Sesión Yoga Pro</h4>
                  <p className="text-[#a1a1aa] text-xs mt-1">08:30 - 09:30 | Terraza</p>
                  <div className="flex items-center gap-1.5 mt-2 text-[#71717a] text-xs font-bold">
                    <Users size={12} />
                    <span>8 ASISTENTES</span>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <button className="w-full py-2.5 rounded-lg border border-[#1e293b] text-white text-sm font-bold hover:bg-[#2d68f8]/10 transition-colors">
                  Ver Calendario Completo
                </button>
              </div>
            </div>
          </div>

          {/* Estado del sistema */}
          <div className="border border-[#1e293b] bg-[#131826] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <h3 className="text-[#3b82f6] text-xs font-bold uppercase tracking-wider">Estado del Sistema</h3>
            </div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-[#94a3b8]">Almacenamiento</span>
              <span className="text-white font-bold">64%</span>
            </div>
            <div className="w-full rounded-full h-1 mb-4 bg-[#1e293b]">
              <div className="bg-[#3b82f6] h-1 rounded-full w-[64%]"></div>
            </div>
            <p className="text-[#64748b] text-xs leading-relaxed font-medium">
              Todos los servicios están funcionando correctamente. Próximo mantenimiento: Domingo 04:00 AM.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard