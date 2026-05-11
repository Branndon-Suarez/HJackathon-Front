import React, { useRef } from 'react';
import { 
  AlertTriangle, TrendingUp, Zap, ShieldCheck, 
  Target, Activity, ArrowRight, MousePointer2, 
  Mail, Users, FileText, CheckCircle2, Rocket,
  Search, MessageSquare, Handshake, ChevronLeft, ChevronRight,
  PieChart, Download, FileDown, Info
} from 'lucide-react';

// 1. COMPONENTE: TARJETAS DE SALUD COMERCIAL
const HealthCard = ({ title, status, value, desc }) => {
  const statusColors = {
    critico: 'bg-red-500 shadow-[0_0_10px_#ef4444]',
    debil: 'bg-yellow-500 shadow-[0_0_10px_#f59e0b]',
    fuerte: 'bg-[#0FEFFD] shadow-[0_0_10px_#0FEFFD]',
  };

  return (
    <div className="bg-[#181A24]/60 border border-white/10 p-4 rounded-xl hover:border-[#E625FF]/40 transition-all group relative overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{title}</h4>
        <div className={`w-2 h-2 rounded-full ${statusColors[status] || 'bg-gray-500'} animate-pulse`} />
      </div>
      <div className="space-y-1">
        <div className="text-xl font-bold text-white tracking-tight">{value}</div>
        <p className="text-[10px] text-gray-500 leading-tight group-hover:text-gray-300 transition-colors">{desc}</p>
      </div>
    </div>
  );
};

// 2. COMPONENTE: MEDIDORES RADIALES
const CircularGauge = ({ value, label, color, percentage }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative w-16 h-16">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path className="stroke-white/5 fill-none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path className={`${color} fill-none transition-all duration-1000 ease-out`} strokeWidth="3" strokeDasharray={`${percentage}, 100`} strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono">
        <span className="text-[10px] font-bold text-white">{value}</span>
      </div>
    </div>
    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
  </div>
);

export default function PlaybookView() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 320 : scrollLeft + 320;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const commercialHealth = [
    { title: "Oferta", status: "fuerte", value: "Fuerte", desc: "Diferenciación clara." },
    { title: "Seguimiento", status: "critico", value: "Fuga Alta", desc: "Sin CRM. Respuesta > 4h." },
    { title: "CAC", status: "critico", value: "Ciego", desc: "Costo desconocido." },
    { title: "Conversión", status: "debil", value: "1.2%", desc: "Fricción en checkout." },
    { title: "ICP", status: "debil", value: "Difuso", desc: "Leads sin capacidad." },
    { title: "Monetización", status: "fuerte", value: "$1.2k", desc: "Ticket saludable." },
    { title: "Retención", status: "fuerte", value: "82%", desc: "LTV potencial." },
    { title: "Referidos", status: "critico", value: "0.2%", desc: "Sin sistema viral." },
    { title: "Velocidad", status: "debil", value: "Lenta", desc: "Ciclo de venta largo." },
    { title: "Cultura", status: "fuerte", value: "Óptima", desc: "Equipo alineado." },
    { title: "Operaciones", status: "debil", value: "Manual", desc: "Baja automatización." },
    { title: "Escala", status: "debil", value: "Media", desc: "Cuellos de botella." },
  ];

  const hyperLoopSteps = [
    { phase: "Navegación", title: "Filtro Radar ICP", icon: <Search size={20}/>, color: "text-[#0FEFFD]", desc: "Validación de fit técnico." },
    { phase: "Navegación", title: "Apertura de Valor", icon: <MessageSquare size={20}/>, color: "text-[#0FEFFD]", desc: "Ángulo de ayuda inicial." },
    { phase: "Navegación", title: "Auditoría de Fugas", icon: <Activity size={20}/>, color: "text-[#0FEFFD]", desc: "Diagnóstico profundo." },
    { phase: "Propulsión", title: "Prueba Concepto", icon: <Rocket size={20}/>, color: "text-[#E625FF]", desc: "Evidencia de resultados." },
    { phase: "Propulsión", title: "Discovery Call", icon: <Users size={20}/>, color: "text-[#E625FF]", desc: "Co-creación de solución." },
    { phase: "Propulsión", title: "Oferta Elite", icon: <FileText size={20}/>, color: "text-[#E625FF]", desc: "Presentación ROI." },
    { phase: "Expansión", title: "Acoplamiento", icon: <Handshake size={20}/>, color: "text-[#E7B0EE]", desc: "Cierre y onboarding." },
    { phase: "Expansión", title: "Vuelo de Éxito", icon: <TrendingUp size={20}/>, color: "text-[#E7B0EE]", desc: "Primera victoria." },
    { phase: "Expansión", title: "Radar Referidos", icon: <Zap size={20}/>, color: "text-[#E7B0EE]", desc: "Loops de viralidad." },
  ];

  return (
    <div className="max-w-[1400px] mx-auto py-8 px-6 space-y-10 bg-[#0B0B10]">
      
      {/* 1. HEADER ESTRATÉGICO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#0FEFFD]">
            <Activity size={16} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Intelligence Report v8.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
            Playbook <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E625FF] to-[#0FEFFD]">Estratégico</span>
          </h1>
          <p className="text-gray-500 text-xs italic font-medium">Auditoría de Rendimiento</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 text-white/70">
            <FileDown size={16} className="text-[#0FEFFD]" /> DESCARGAR PDF AUDITORÍA
          </button>
          <button className="bg-gradient-to-r from-[#E625FF] to-[#5B16E6] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(230,37,255,0.4)] hover:scale-105 transition-all">
            INICIAR ROADMAP
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LADO IZQUIERDO: CAUSA RAÍZ Y SALUD */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-[#12131A] border-l-4 border-[#E625FF] p-8 rounded-2xl relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform"><AlertTriangle size={80}/></div>
            <div className="relative z-10 space-y-3">
              <span className="text-[#E625FF] font-black text-[9px] uppercase tracking-[0.3em]">Hallazgo Crítico</span>
              <h2 className="text-2xl md:text-3xl text-white font-medium leading-tight italic">
                "Tu embudo tiene <span className="text-[#0FEFFD] font-bold underline decoration-wavy">fricción estructural</span> en el cierre; la oferta actual no resiste el mercado."
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <PieChart size={16} className="text-gray-500" /> 
                   <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Salud Comercial (12 Variables)</h3>
                </div>
                
                {/* LEYENDA / CONVENCIÓN DE SENSORES */}
                <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Crítico</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">En Riesgo</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0FEFFD]"></div>
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Óptimo</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {commercialHealth.map((item, i) => <HealthCard key={i} {...item} />)}
            </div>
          </div>
        </div>

        {/* LADO DERECHO: RADIOGRAFÍA Y ECUACIÓN */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card p-8 rounded-[40px] border-white/5 space-y-10 shadow-inner">
            <div className="grid grid-cols-2 gap-y-12">
              <CircularGauge value="$450" label="CAC" color="stroke-[#E625FF]" percentage={70} />
              <CircularGauge value="$3.2k" label="LTV" color="stroke-[#0FEFFD]" percentage={85} />
              <CircularGauge value="7.1x" label="ROI" color="stroke-[#E625FF]" percentage={92} />
              <CircularGauge value="24%" label="CONV" color="stroke-[#0FEFFD]" percentage={60} />
            </div>
          </div>

          <div className="bg-[#181A24] border border-white/10 p-8 rounded-[40px] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E625FF]/5 to-transparent opacity-30"></div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-10 relative z-10">Ecuación de Valor</h4>
            
            <div className="flex flex-col gap-6 relative z-10 max-w-[240px] mx-auto font-black">
                <div className="flex justify-between items-center text-[10px]">
                    <div className="flex-1 space-y-1"><span className="text-[#E625FF] block text-base leading-none">RESULTADO</span><span className="text-gray-500 uppercase tracking-tighter">Deseado</span></div>
                    <div className="mx-2 text-gray-700 text-xl">×</div>
                    <div className="flex-1 space-y-1"><span className="text-[#E625FF] block text-base leading-none">CERTEZA</span><span className="text-gray-500 uppercase tracking-tighter">Percibida</span></div>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div className="flex justify-between items-center text-[10px]">
                    <div className="flex-1 space-y-1"><span className="text-[#0FEFFD] block text-base leading-none">TIEMPO</span><span className="text-gray-500 uppercase tracking-tighter">Demora</span></div>
                    <div className="mx-2 text-gray-700 text-xl">+</div>
                    <div className="flex-1 space-y-1"><span className="text-[#0FEFFD] block text-base leading-none">ESFUERZO</span><span className="text-gray-500 uppercase tracking-tighter">Sacrificio</span></div>
                </div>
            </div>

            <div className="mt-10 py-6 bg-[#0FEFFD]/10 border border-[#0FEFFD]/20 rounded-3xl relative z-10 group hover:border-[#0FEFFD]/50 transition-all">
                <div className="text-5xl font-black text-[#0FEFFD] drop-shadow-[0_0_20px_#0FEFFD] group-hover:scale-110 transition-transform">+85 pts</div>
                <p className="text-[9px] text-[#0FEFFD] mt-3 uppercase font-black tracking-[0.3em]">Valor Neto RiBuzz</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HIPER-LOOP CON NAVEGACIÓN COMPACTA */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-2">
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Hiper-Loop <span className="text-[#0FEFFD]">Estratégico</span></h3>
          <div className="h-px flex-grow bg-white/10" />
        </div>

        <div className="relative group/slider">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-20 flex items-center justify-start pointer-events-none bg-gradient-to-r from-[#0B0B10] to-transparent">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full bg-[#12131A] border border-white/10 flex items-center justify-center text-white hover:border-[#E625FF] hover:shadow-[0_0_20px_#E625FF] transition-all pointer-events-auto ml-2 active:scale-90 duration-300">
              <ChevronLeft size={32} />
            </button>
          </div>

          <div ref={scrollRef} className="flex overflow-x-auto gap-6 px-24 py-4 no-scrollbar snap-x transition-all">
            {hyperLoopSteps.map((step, i) => (
              <div key={i} className="min-w-[280px] bg-[#12131A] border border-white/5 p-8 rounded-[32px] hover:bg-[#181A24] hover:border-[#0FEFFD]/30 transition-all snap-center group relative">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-5xl font-black text-white/5 group-hover:text-[#E625FF]/10 transition-colors leading-none tracking-tighter font-mono">
                    {(i+1).toString().padStart(2, '0')}
                  </span>
                  <div className={`${step.color} p-4 rounded-3xl bg-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all`}>
                    {step.icon}
                  </div>
                </div>
                <div className="space-y-3">
                  <span className={`${step.color} text-[8px] font-black uppercase tracking-[0.4em] px-3 py-1 bg-white/5 rounded-full`}>{step.phase}</span>
                  <h4 className="text-white font-bold text-xl tracking-tight">{step.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">{step.desc}</p>
                </div>
                <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${step.color.replace('text-', 'bg-')} opacity-30 w-1/4 group-hover:w-full transition-all duration-1000`} />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-24 z-20 flex items-center justify-end pointer-events-none bg-gradient-to-l from-[#0B0B10] to-transparent">
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-[#12131A] border border-white/10 flex items-center justify-center text-white hover:border-[#0FEFFD] hover:shadow-[0_0_20px_#0FEFFD] transition-all pointer-events-auto mr-2 active:scale-90 duration-300">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. RECOMENDACIÓN FINAL COMPACTA */}
      <div className="bg-gradient-to-br from-[#181A24] to-[#0B0B10] border border-[#0FEFFD]/20 p-10 rounded-[48px] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E625FF]/5 blur-[100px] -z-10"></div>
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#0FEFFD]/10 border border-[#0FEFFD]/20 text-[10px] font-black text-[#0FEFFD] uppercase tracking-widest">
            Veredicto Estratégico <div className="w-2 h-2 rounded-full bg-[#0FEFFD] animate-pulse ml-2" />
          </div>
          <h4 className="text-4xl text-white font-black tracking-tighter leading-none">Implementar Modelo 'Growth Partner'</h4>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
            Basado en tu puntaje de **Fit (92%)**, RiBuzz recomienda una transición inmediata a sociedad por resultados. Deja de comprar tácticas; empieza a comprar **Estructura**.
          </p>
        </div>
        <button className="bg-white text-black px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-[#0FEFFD] hover:scale-105 transition-all flex items-center gap-4 group shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          INICIAR TRANSICIÓN <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}