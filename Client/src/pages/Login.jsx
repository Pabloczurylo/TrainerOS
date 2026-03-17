import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { API_URL } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError(''); 

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.username, 
          password: data.password
        }), 
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Credenciales incorrectas');
      }

      login(result.user, result.token);
      navigate('/dashboard'); 

    } catch (error) {
      console.error(error);
      setServerError(error.message || 'Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    //  'relative' para que el botón absoluto se posicione respecto a este contenedor
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-start pt-12 px-4 font-sans animate-in fade-in duration-500 relative">
      
      
      <div className="absolute top-6 left-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium hidden sm:inline">Volver al Inicio</span>
        </Link>
      </div>
      

      {/* Header */}
      <header className="mb-32">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-500">
          PT Manager
        </h2>
      </header>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
            Acceso Cliente
          </h1>
          <p className="text-gray-400 text-sm">
            Bienvenido de nuevo
          </p>
        </div>

        {/* Mensaje de Error */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3 text-red-200 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Input: Usuario */}
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1 text-gray-300">Email / Usuario</label>
            <div className="relative">
              <input
                {...register("username", { required: "El usuario es obligatorio" })}
                type="text"
                placeholder="Introduce tu usuario o email"
                className="w-full bg-[#1a2230] border border-transparent focus:border-blue-500 rounded-lg py-3 px-4 pr-12 text-sm outline-none transition-all placeholder:text-gray-500 text-white"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
            {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
          </div>

          {/* Input: Contraseña */}
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1 text-gray-300">Contraseña</label>
            <div className="relative">
              <input
                {...register("password", { required: "La contraseña es obligatoria" })}
                type={showPassword ? "text" : "password"} 
                placeholder="Introduce tu contraseña"
                className="w-full bg-[#1a2230] border border-transparent focus:border-blue-500 rounded-lg py-3 px-4 pr-12 text-sm outline-none transition-all placeholder:text-gray-500 text-white"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* Botón Submit */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mt-4 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;