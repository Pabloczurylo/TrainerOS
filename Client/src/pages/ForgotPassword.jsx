import { useState } from 'react';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular llamada al backend
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 flex flex-col font-sans">
      
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5V6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5C15.0376 17.5 17.5 15.0376 17.5 12H21.5C21.5 17.2467 17.2467 21.5 12 21.5Z" fill="#3b82f6"/>
            <circle cx="17.5" cy="6.5" r="4" fill="#3b82f6"/>
          </svg>
          <span className="font-bold text-white tracking-wide">Unlimited Training System</span>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="p-2 bg-[#1E293B]/50 hover:bg-[#1E293B] text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700/50"
          aria-label="Volver"
        >
          <ArrowLeft size={18} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full">
        
        <div className="w-full max-w-[400px] flex flex-col items-center">
          <h2 className="text-3xl font-black text-white mb-3 text-center tracking-tight">Recuperar contraseña</h2>
          <p className="text-[15px] text-slate-400 text-center mb-8 px-2 leading-relaxed">
            Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.
          </p>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white block">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-[#111827] border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg py-2.5 pl-11 pr-4 text-[15px] outline-none transition-all placeholder:text-slate-500 text-white"
                  />
                </div>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-900/20"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Enviar código'}
              </button>
            </form>
          ) : (
             <div className="w-full p-6 border border-green-800 bg-green-900/20 rounded-xl text-center">
                 <p className="text-green-400 font-medium text-[15px]">
                    Si existe una cuenta asociada a <strong>{email}</strong>, hemos enviado un código de recuperación. Revisa tu bandeja de entrada.
                 </p>
             </div>
          )}

          <div className="mt-8">
            <Link 
              to="/login" 
              className="text-sm text-slate-400 hover:text-slate-300 transition-colors underline decoration-slate-600 hover:decoration-slate-400 underline-offset-4"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-[11px] font-medium text-slate-500 text-center">
        © 2024 Unlimited Training System. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default ForgotPassword;
