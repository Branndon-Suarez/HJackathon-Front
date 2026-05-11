import React, { useState } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import { Loader2, Rocket, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

const LoginView = ({ onBack }) => {
  const { login: handleLogin } = useDiagnostic();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    if (!email.trim()) {
      setError('El correo es obligatorio');
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Ingresa un correo electrónico válido');
      return false;
    }
    if (!password) {
      setError('La contraseña es obligatoria');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    setServerError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await handleLogin(email, password);
      if (!result.success) {
        setServerError(result.error || 'Correo o contraseña incorrectos');
      }
    } catch (err) {
      setServerError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B10] p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E625FF]/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0FEFFD]/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="w-full max-w-[420px] bg-[#12131A]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-[10px] text-gray-500 hover:text-white font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5 group"
          >
            <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Volver
          </button>
        )}

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5B16E6] to-[#E625FF] flex items-center justify-center shadow-[0_0_30px_rgba(230,37,255,0.4)] mb-6">
            <Rocket className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-[0.15em] uppercase">RiBuzz</h1>
          <span className="text-[10px] text-[#0FEFFD] font-black uppercase tracking-[0.4em] mt-2">Commercial Operating System</span>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Acceso al Sistema</h2>
            <p className="text-gray-500 text-xs font-medium">Ingresa tu correo electrónico para acceder.</p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E625FF] transition-colors" size={18} />
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full bg-black/40 border ${error || serverError ? 'border-red-500/60' : 'border-white/5'} rounded-full py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#E625FF]/50 transition-all placeholder:text-gray-700`}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E625FF] transition-colors" size={18} />
              <input
                type="password"
                placeholder="contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={handleKeyDown}
                className={`w-full bg-black/40 border ${error || serverError ? 'border-red-500/60' : 'border-white/5'} rounded-full py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#E625FF]/50 transition-all placeholder:text-gray-700`}
              />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-[10px] text-red-400 font-medium bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2">
                <AlertCircle size={12} /> {error}
              </div>
            )}

            {serverError && (
              <div className="flex items-center gap-2 text-red-400 text-[10px] font-medium bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2.5">
                <AlertCircle size={14} /> {serverError}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#E625FF] to-[#5B16E6] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-full shadow-[0_20px_40px_rgba(230,37,255,0.2)] hover:shadow-[0_20px_50px_rgba(230,37,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Autenticando...
              </>
            ) : (
              <>
                Acceder al Sistema <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E625FF]/5 border border-[#E625FF]/10">
              <Sparkles size={10} className="text-[#E625FF]" />
              <span className="text-[9px] text-gray-400 font-medium">
                Demo: <span className="text-[#0FEFFD] font-bold">demo@ribuzz.com</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 flex justify-between w-full px-12 opacity-30">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0FEFFD] animate-pulse" />
          <span className="text-[9px] font-black text-white uppercase tracking-widest">Sistemas Operativos</span>
        </div>
        <span className="text-[9px] font-black text-white uppercase tracking-widest">v2.04.12 // RiBuzz Corp</span>
      </div>
    </div>
  );
};

export default LoginView;