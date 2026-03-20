import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, AlertCircle, Dumbbell } from 'lucide-react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { API_URL } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

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
      // Bypassing fetch ya que no hay backend:
      // Simulamos una respuesta exitosa
      setTimeout(() => {
        const fakeUser = { id: 1, name: data.email.split('@')[0], email: data.email };
        const fakeToken = "temp-token-without-backend";
        
        login(fakeUser, fakeToken);
        navigate('/dashboard'); 
        setIsLoading(false);
      }, 800);

    } catch (error) {
      console.error(error);
      setServerError(error.message || 'Error al conectar con el servidor');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 flex flex-col font-sans relative overflow-hidden">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vh] bg-blue-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 z-10 pt-12 pb-8">
        {/* Top Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-2 bg-[#1E293B]/50 border border-slate-700/50 rounded-lg mb-4">
            <Dumbbell className="text-blue-500 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">TrainerOS</h1>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[420px] bg-[#111827]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white mb-1">Bienvenido de nuevo</h2>
            <p className="text-sm text-slate-400">Ingresa a tu cuenta para gestionar tus rutinas</p>
          </div>

          {/* Mensaje de Error */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3 text-red-200 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors"
            >
              <GoogleIcon />
              <span>Iniciar sesión con Google</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-[11px] text-slate-500 font-medium tracking-wider">O CONTINUAR CON EMAIL</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input: Correo electrónico */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-200 block">Correo electrónico</label>
              <input
                {...register("email", { required: "El correo electrónico es obligatorio" })}
                type="email"
                placeholder="ejemplo@correo.com"
                className="w-full bg-[#0B1120] border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg py-2.5 px-3 text-sm outline-none transition-all placeholder:text-slate-600 text-white"
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            {/* Input: Contraseña */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-200">Contraseña</label>
                <Link to="/forgot-password" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password", { required: "La contraseña es obligatoria" })}
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-[#0B1120] border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg py-2.5 px-3 pr-10 text-sm outline-none transition-all placeholder:text-slate-600 text-white"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center p-1"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>

            {/* Botón Submit */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg mt-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-900/20"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            ¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium">Regístrate gratis</Link>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            ← Volver a la página principal
          </Link>
        </div>
      </div>

      <div className="w-full py-6 text-xs text-slate-500 z-10 text-center border-t border-slate-800/50">
        © 2024 TrainerOS System. Todos los derechos reservados.
      </div>
    </div>
  );
};

export default Login;
