import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#0b0f19] to-[#0a0a0a] px-6 md:px-12 pt-20 pb-16 flex justify-center min-h-screen">
      <div className="w-full max-w-5xl flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Nuevo: la v3.0 ya disponible
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-lg">
          Potencia tu carrera como <br />
          <span className="text-blue-500 mt-2 block">Personal Trainer</span>
        </h1>
        
        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-medium max-w-3xl">
          La herramienta definitiva para gestionar tus alumnos, crear rutinas personalizadas y escalar tu negocio de fitness sin perder calidad en el servicio.
        </p>
        
        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto">
          <Link 
            to="/login"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 w-full sm:w-auto justify-center"
          >
            Comenzar prueba gratis
          </Link>
          <button 
            className="flex items-center gap-2 bg-[#1a1f2e] hover:bg-[#252b3d] text-white border border-gray-700 font-bold px-8 py-4 rounded-xl transition-all w-full sm:w-auto justify-center"
          >
            <Play size={20} className="text-gray-400" />
            Ver demo
          </button>
        </div>

        {/* Dashboard Mockup (CSS) */}
        <div className="w-full relative rounded-t-2xl md:rounded-3xl border border-gray-800 bg-[#151a28] shadow-2xl shadow-blue-900/10 p-2 md:p-4 overflow-hidden">
          {/* Mockup Header (macOS style dots) */}
          <div className="flex items-center gap-2 mb-4 px-4 pt-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="flex-1 text-center text-xs text-gray-600 font-medium">TrainerOS Dashboard</div>
          </div>
          
          {/* Mockup Body Content */}
          <div className="flex gap-4 h-[300px] md:h-[450px]">
             {/* Sidebar Mockup */}
             <div className="hidden md:flex flex-col gap-3 w-48 border-r border-gray-800 pr-4">
                <div className="w-full h-8 bg-blue-600/20 rounded-lg"></div>
                <div className="w-3/4 h-6 bg-gray-800/50 rounded-lg"></div>
                <div className="w-5/6 h-6 bg-gray-800/50 rounded-lg"></div>
                <div className="w-2/3 h-6 bg-gray-800/50 rounded-lg"></div>
                <div className="mt-auto w-full h-10 bg-gray-800/50 rounded-lg"></div>
             </div>
             
             {/* Main Content Mockup */}
             <div className="flex-1 flex flex-col gap-4">
               {/* Top Stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="h-28 bg-[#1e2436] rounded-xl border border-gray-800 p-4 flex flex-col justify-between">
                     <div className="w-8 h-8 rounded-full bg-blue-500/20"></div>
                     <div className="w-1/2 h-4 bg-gray-700 rounded mt-4"></div>
                     <div className="w-1/3 h-6 bg-gray-600 rounded mt-2"></div>
                  </div>
                  <div className="h-28 bg-[#1e2436] rounded-xl border border-gray-800 p-4 flex flex-col justify-between hidden sm:flex">
                     <div className="w-8 h-8 rounded-full bg-green-500/20"></div>
                     <div className="w-1/2 h-4 bg-gray-700 rounded mt-4"></div>
                     <div className="w-1/3 h-6 bg-gray-600 rounded mt-2"></div>
                  </div>
                  <div className="h-28 bg-[#1e2436] rounded-xl border border-gray-800 p-4 flex flex-col justify-between hidden sm:flex">
                     <div className="w-8 h-8 rounded-full bg-purple-500/20"></div>
                     <div className="w-1/2 h-4 bg-gray-700 rounded mt-4"></div>
                     <div className="w-1/3 h-6 bg-gray-600 rounded mt-2"></div>
                  </div>
               </div>
               {/* Main Chart/Table area */}
               <div className="flex-1 bg-[#1e2436] rounded-xl border border-gray-800 p-4 flex flex-col gap-3">
                  <div className="w-1/4 h-5 bg-gray-700 rounded mb-2"></div>
                  <div className="w-full h-8 bg-gray-800/50 rounded flex items-center px-4"><div className="w-1/3 h-3 bg-gray-600 rounded"></div></div>
                  <div className="w-full h-8 bg-gray-800/50 rounded flex items-center px-4"><div className="w-2/5 h-3 bg-gray-600 rounded"></div></div>
                  <div className="w-full h-8 bg-gray-800/50 rounded flex items-center px-4"><div className="w-1/4 h-3 bg-gray-600 rounded"></div></div>
                  <div className="w-full h-8 bg-gray-800/50 rounded flex items-center px-4"><div className="w-1/2 h-3 bg-gray-600 rounded"></div></div>
               </div>
             </div>
          </div>
          
          {/* Overlay Gradient for fade out effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b0f19] to-transparent"></div>
        </div>

      </div>
    </section>
  )
}

export default Hero