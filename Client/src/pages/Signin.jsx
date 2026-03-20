import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, AlertCircle, Dumbbell } from 'lucide-react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuthStore } from '../store/useAuthStore';

const Signin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Added watch to compare password and confirmPassword fields
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError(''); 

    try {
      // Simular un registro exitoso (sin backend)
      setTimeout(() => {
        const fakeUser = { id: Date.now(), name: data.fullName, email: data.email };
        const fakeToken = "temp-token-without-backend";
        
        // Log in the state and redirect to dashboard
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

        {/* Register Card */}
        <div className="w-full max-w-[420px] bg-[#111827]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Crear una cuenta</h2>
            <p className="text-sm text-slate-400">Empieza a gestionar tus entrenamientos hoy mismo</p>
          </div>

          {/* Error Message */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3 text-red-200 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input: Nombre completo */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-200 block">Nombre completo</label>
              <input
                {...register("fullName", { required: "El nombre es obligatorio" })}
                type="text"
                placeholder="Tu nombre"
                className="w-full bg-[#0B1120] border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg py-2.5 px-3 text-sm outline-none transition-all placeholder:text-slate-600 text-white"
              />
              {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
            </div>

            {/* Input: Correo electrónico */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-200 block">Correo electrónico</label>
              <input
                {...register("email", { 
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Ingresa un correo válido"
                  }
                })}
                type="text"
                placeholder="ejemplo@correo.com"
                className="w-full bg-[#0B1120] border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg py-2.5 px-3 text-sm outline-none transition-all placeholder:text-slate-600 text-white"
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            {/* Input: Contraseña */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-200 block">Contraseña</label>
              <div className="relative">
                <input
                  {...register("password", { 
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}
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

            {/* Input: Confirmar contraseña */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-200 block">Confirmar contraseña</label>
              <div className="relative">
                <input
                  {...register("confirmPassword", { 
                    required: "Confirma tu contraseña",
                    validate: (value) => value === password || "Las contraseñas no coinciden"
                  })}
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-[#0B1120] border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg py-2.5 px-3 pr-10 text-sm outline-none transition-all placeholder:text-slate-600 text-white"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center p-1"
                >
                  {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg mt-4 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-900/20"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Crear cuenta'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400 border-t border-slate-800/50 pt-6">
            ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium">Iniciar sesión</Link>
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

export default Signin;
