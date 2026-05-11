import React from 'react';
import { AlertTriangle, CheckCircle2, TrendingUp, Zap, Target } from 'lucide-react';

const HealthCard = ({ title, status, desc }) => {
  const isCritical = status === 'critico';
  const isWeak = status === 'debil';
  return (
    <div className="bg-[#181A24]/40 border border-white/5 p-5 rounded-xl hover:border-[#E625FF]/40 transition-all">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</h4>
        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px] ${isCritical ? 'bg-red-500 shadow-red-500' : isWeak ? 'bg-yellow-500 shadow-yellow-500' : 'bg-[#0FEFFD] shadow-[#0FEFFD]'}`} />
      </div>
      <p className="text-sm text-white font-medium leading-relaxed">{desc}</p>
    </div>
  );
};

export default function PlaybookView() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10 animate-in zoom-in-95 duration-500">
      {/* Header Reporte */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-10">
        <div>
          <h1 className="text-5xl font-display font-bold text-white mb-2">PLAYBOOK <span className="text-[#E625FF]">ESTRATÉGICO</span></h1>
          <p className="text-[#0FEFFD] font-mono tracking-widest uppercase text-xs">Radiografía de Rendimiento v4.0</p>
        </div>
        <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm font-bold hover:bg-white/10 transition-all">
          Descargar PDF Completo
        </button>
      </div>

      {/* Causa Raíz Banner */}
      <div className="bg-gradient-to-r from-[#E625FF]/20 to-transparent border-l-4 border-[#E625FF] p-8 rounded-r-2xl">
        <div className="flex items-center gap-4 mb-2">
            <AlertTriangle className="text-[#E625FF]" />
            <span className="text-[#E625FF] font-bold uppercase tracking-widest text-xs">Hallazgo Principal (Causa Raíz)</span>
        </div>
        <h2 className="text-2xl text-white font-medium italic">
            "Tu cuello de botella no es la generación de leads, es la <span className="text-[#0FEFFD] font-bold">Fuga de Seguimiento</span>. Pierdes el 40% de tus ventas por tardar más de 2 horas en responder."
        </h2>
      </div>

      {/* Grid 12 Variables */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <HealthCard title="Oferta" status="escalable" desc="Propuesta clara y diferenciada." />
        <HealthCard title="Seguimiento" status="critico" desc="No hay CRM ni tiempos de respuesta definidos." />
        <HealthCard title="ICP" status="debil" desc="Perfil difuso, atraes muchos curiosos." />
        <HealthCard title="CAC" status="critico" desc="Costo de adquisición desconocido." />
        {/* Agrega más según necesites */}
      </div>

      {/* Hiper-Loop 9 Pasos */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
            <Zap className="text-[#0FEFFD]" /> EL HIPER-LOOP PERSONALIZADO
        </h3>
        <div className="flex overflow-x-auto gap-4 pb-6 custom-scrollbar snap-x">
            {[1,2,3,4,5,6,7,8,9].map(step => (
                <div key={step} className="min-w-[200px] bg-white/5 p-6 rounded-2xl border border-white/5 snap-start">
                    <span className="text-4xl font-display font-black text-white/10 mb-4 block">{step.toString().padStart(2, '0')}</span>
                    <h5 className="font-bold text-[#0FEFFD] mb-2 uppercase text-xs tracking-widest">Fase de Navegación</h5>
                    <p className="text-sm text-gray-300">Auditoría de Activos y Limpieza de CRM.</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}