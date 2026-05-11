import React from 'react';
import { 
  Target, 
  TrendingUp, 
  LayoutGrid, 
  Activity, 
  ChevronRight, 
  Zap, 
  Brain, 
  CheckCircle2, 
  Rocket,
  ShieldCheck,
  Plus
} from 'lucide-react';

// 1. COMPONENTE: MEDIDOR RADIAL CENTRADO
const FitGauge = ({ percentage, label, sublabel }) => (
  <div className="flex flex-col items-center text-center gap-3  group">
    <div className="relative w-16 h-16 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path className="stroke-white/5 fill-none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path className="stroke-[#E625FF] fill-none transition-all duration-1000" strokeWidth="3" strokeDasharray={`${percentage}, 100`} strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black text-white">{percentage}%</span>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{label}</span>
      <span className="text-[7px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#E625FF] transition-colors">{sublabel}</span>
    </div>
  </div>
);

// 2. COMPONENTE: TARJETA DE MÉTRICA
const StatCard = ({ title, value, label, icon: Icon, color, progress }) => (
  <div className="bg-[#12131A] border border-white/5 p-5 rounded-3xl space-y-3 hover:border-white/10 transition-all group relative overflow-hidden">
    <div className="flex justify-between items-center">
      <div className={`p-2.5 rounded-xl bg-white/5 ${color}`}>
        <Icon size={16} />
      </div>
      <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">{title}</div>
    </div>
    <div>
      <div className="text-2xl font-black text-white tracking-tighter">{value}</div>
      <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mt-0.5">{label}</p>
    </div>
    {progress && (
      <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r from-[#E625FF] to-[#0FEFFD]`} style={{ width: `${progress}%` }} />
      </div>
    )}
  </div>
);

const CockpitView = ({ onStartDiagnostic }) => {
  return (
    <div className="max-w-[1200px] mx-auto py-6 px-6 space-y-8 bg-[#0B0B10] animate-in fade-in duration-500">
      
      {/* HEADER ESTRATÉGICO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#0FEFFD]">
            <Activity size={14} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Tactical Overview v2.7</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
            
            Panel de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E625FF] to-[#0FEFFD]">Control</span>
          </h1>
            <p className="text-gray-500 text-xs italic font-medium">Centro de Monitoreo y Rendimiento</p>

        </div>
        
        <button 
          onClick={onStartDiagnostic}
          className="bg-gradient-to-r from-[#E625FF] to-[#5B16E6] px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(230,37,255,0.3)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus size={14} /> NUEVO DIAGNÓSTICO
        </button>
      </header>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Meta Mensual" value="$5.000k" label="COP OBJETIVO" icon={Target} color="text-[#E625FF]" />
        <StatCard title="Ventas Hoy" value="$0" label="COP RECAUDADO" icon={TrendingUp} color="text-[#0FEFFD]" />
        <StatCard title="Tareas Sistema" value="65%" label="EJECUCIÓN" icon={CheckCircle2} color="text-[#E625FF]" progress={65} />
        <StatCard title="Proyectos" value="4 - 5" label="CAPACIDAD" icon={LayoutGrid} color="text-[#0FEFFD]" />
      </div>

      {/* ÁREA CENTRAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* POSICIONAMIENTO (Más pequeño) */}
        <div className="lg:col-span-8 bg-[#12131A] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E625FF]/5 via-transparent to-[#0FEFFD]/5 opacity-40" />
          <div className="relative z-10 space-y-4">
            <span className="text-[8px] font-black text-[#E625FF] uppercase tracking-[0.4em] px-3 py-1 bg-white/5 rounded-full border border-white/5">Estrategia Elite</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.95] max-w-sm">RiBuzz Strategy <br/><span className="text-[#0FEFFD]">Operating System</span></h2>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed italic">
              "Fusión de diagnósticos de precisión con ejecución táctica de alto impacto."
            </p>
            <div className="flex gap-3 pt-4">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                <Rocket size={12} className="text-[#E625FF]" /> Futuristic
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={12} className="text-[#0FEFFD]" /> Precision
              </div>
            </div>
          </div>
        </div>

        {/* INTELIGENCIA DE FIT (Compacto y Centrado) */}
        <div className="lg:col-span-4 bg-[#12131A] border border-white/5 rounded-[32px] p-6 flex flex-col items-center justify-between relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E625FF]/5 blur-[60px] -z-10" />
            
            <div className="w-full space-y-6">
                <div className="flex items-center justify-center gap-2">
                    <Brain size={16} className="text-gray-600" />
                    <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Inteligencia de Fit</h3>
                </div>

                <div className="flex justify-around items-center w-full">
                    <FitGauge percentage={75} label="Coach" sublabel="Alta" />
                    <FitGauge percentage={90} label="Urgencia" sublabel="Máxima" />
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 w-full text-center">
                <div className="text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(230,37,255,0.2)]">88</div>
                <div className="flex flex-col mt-1">
                    <span className="text-[10px] font-black text-[#E625FF] uppercase tracking-[0.3em]">RiBuzz Score</span>
                    <span className="text-[7px] font-bold text-gray-600 uppercase tracking-widest">Alineación Elite</span>
                </div>
            </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="flex items-center justify-between p-5 bg-[#12131A] border border-white/5 rounded-2xl">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            <span className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em]">Systems: Stable</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-[#0FEFFD]" />
            <span className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em]">Stream: Active</span>
          </div>
        </div>
        <div className="text-[8px] text-gray-700 font-mono font-bold tracking-widest uppercase">
          RX-2026-RIBUZZ
        </div>
      </footer>
    </div>
  );
};

export default CockpitView;