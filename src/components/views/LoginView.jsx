import React from 'react';
import { Rocket, Shield, Lock, Mail, ArrowRight } from 'lucide-react';

const LoginView = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B10] p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E625FF]/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0FEFFD]/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-[440px] bg-[#12131A]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5B16E6] to-[#E625FF] flex items-center justify-center shadow-[0_0_30px_rgba(230,37,255,0.4)] mb-6">
            <Rocket className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-[0.2em] uppercase">RiBuzz</h1>
          <span className="text-[10px] text-[#0FEFFD] font-black uppercase tracking-[0.4em] mt-2">Commercial Operating System</span>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Acceso al Sistema</h2>
            <p className="text-gray-500 text-xs font-medium">Ingresa tus credenciales para tomar el control.</p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E625FF] transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="correo@ribuzz.com"
                className="w-full bg-black/40 border border-white/5 rounded-full py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#E625FF]/50 transition-all placeholder:text-gray-700"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E625FF] transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/5 rounded-full py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#E625FF]/50 transition-all placeholder:text-gray-700"
              />
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-[#E625FF] to-[#5B16E6] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-full shadow-[0_20px_40px_rgba(230,37,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Iniciar Sesión Propulsada <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            ¿No tienes acceso? <span className="text-[#E625FF] cursor-pointer hover:underline">Solicitar Terminal</span>
          </p>
        </div>
      </div>
      
      {/* Footer Status */}
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