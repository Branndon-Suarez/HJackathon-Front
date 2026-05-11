import React, { useState, useEffect } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import {
  MessageSquare,
  Camera,
  Copy,
  CheckCircle2,
  Clock,
  RefreshCw,
  Send,
  Zap,
  Activity,
  Code,
  FileDown,
  LayoutGrid,
  Loader2
} from 'lucide-react';

const ImplementationView = () => {
  const { currentDiagnostic, fetchPlaybookResults } = useDiagnostic();
  const [activeTaskTab, setActiveTaskTab] = useState('hoy');
  const [refreshing, setRefreshing] = useState(false);

  const outputs = currentDiagnostic?.commercial_outputs || {};
  const planMejora = outputs.plan_mejora || [];
  const topPriorities = outputs.top_3_prioridades || [];
  const decision = outputs.decision_final || {};
  const recommendation = outputs.recomendacion_oferta_ribuzz || {};

  // Generate dynamic scripts based on the actual diagnostic data
  const scripts = [
    {
      id: 1,
      type: 'Instagram DM',
      title: 'Cierre Deliberado',
      content: recommendation.oferta_recomendada
        ? `"Entiendo perfectamente tu situación, [Nombre]. Según nuestro análisis de RiBuzz, tu mejor ruta es: ${recommendation.oferta_recomendada}. ${recommendation.justificacion || ''} ¿Te parece si lo revisamos juntos?"`
        : '"Entiendo perfectamente tu situación, [Nombre]. Muchos de nuestros clientes en RiBuzz empezaron igual..."',
      icon: <Camera size={18} className="text-[#0FEFFD]" />,
      color: 'border-[#0FEFFD]'
    },
    {
      id: 2,
      type: 'WhatsApp Business',
      title: decision.siguiente_accion || 'Agendamiento V1',
      content: decision.proxima_accion
        ? `"¡Hola! Qué gusto saludarte. El diagnóstico arrojó que tu prioridad es: ${topPriorities[0]?.accion || 'optimizar tu sistema comercial'}. Tengo disponibles estos espacios libres para agendar..."`
        : '"¡Hola! Qué gusto saludarte. Vi que te interesó el diagnóstico. Tengo estos espacios libres..."',
      icon: <MessageSquare size={18} className="text-[#E625FF]" />,
      color: 'border-[#E625FF]'
    },
    {
      id: 3,
      type: 'Story Reply',
      title: 'Filtro Cualificado',
      content: decision.mensaje_sugerido
        ? `"${decision.mensaje_sugerido.slice(0, 120)}..."`
        : '"¿Estás buscando escalar este mes o solo quieres optimizar lo que ya tienes? Pregunto para..."',
      icon: <Send size={18} className="text-[#0FEFFD]" />,
      color: 'border-[#0FEFFD]'
    },
    {
      id: 4,
      type: 'Seguimiento',
      title: 'Reactivación',
      content: currentDiagnostic?.critical_pain
        ? `"Sé que andas a mil. Identificamos que ${currentDiagnostic.critical_pain} es lo que más frena tu crecimiento. El cupo para la implementación se cierra..."`
        : '"Sé que andas a mil, pero no quería dejar pasar esto. El cupo para la implementación se cierra..."',
      icon: <Zap size={18} className="text-[#E625FF]" />,
      color: 'border-[#E625FF]'
    }
  ];

  // Generate dynamic tasks from backend data
  const tasks = [];
  if (planMejora.length > 0) {
    planMejora.slice(0, 3).forEach((item, i) => {
      tasks.push({
        id: i + 1,
        title: item.variable,
        desc: item.accion || item.mejora_recomendada,
        time: item.horizonte || '7 días',
        priority: item.prioridad?.toUpperCase() || 'MEDIA',
        statusColor: item.prioridad === 'alta' ? 'bg-[#E625FF] shadow-[0_0_10px_#E625FF]' :
                    item.prioridad === 'media' ? 'bg-[#0FEFFD] shadow-[0_0_10px_#0FEFFD]' :
                    'bg-gray-600'
      });
    });
  }
  if (tasks.length === 0) {
    tasks.push(
      { id: 1, title: 'Validar Scripts ICP', desc: 'Revisar métricas de apertura del Q4.', time: '09:00 AM', priority: 'ALTA', statusColor: 'bg-[#E625FF] shadow-[0_0_10px_#E625FF]' },
      { id: 2, title: 'Actualización CRM', desc: 'Sincronizar leads del Hiper-Loop.', time: '02:30 PM', priority: 'MEDIA', statusColor: 'bg-[#0FEFFD] shadow-[0_0_10px_#0FEFFD]' },
      { id: 3, title: 'Reporte Semanal', desc: 'Compilar datos para la junta directiva.', time: '05:00 PM', priority: 'BAJA', statusColor: 'bg-gray-600' }
    );
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    if (currentDiagnostic) {
      await fetchPlaybookResults(currentDiagnostic.id);
    }
    setRefreshing(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto py-8 px-6 space-y-10 bg-[#0B0B10] animate-in fade-in duration-700">
      <div className="flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-gray-400 hover:bg-white/10 transition-all uppercase tracking-widest disabled:opacity-50"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Sincronizar
        </button>
      </div>

      {/* 1. HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#E625FF]">
            <Activity size={16} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Command Center v2.4</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
            Módulo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E625FF] to-[#0FEFFD]">Implementación</span>
          </h1>
          <p className="text-gray-500 text-xs italic font-medium">
            {currentDiagnostic?.critical_pain
              ? `Prioridad: ${currentDiagnostic.critical_pain}`
              : 'Control de despliegue estratégico y automatización táctica.'}
          </p>
        </div>
      </header>

      {/* Fit Score */}
      {currentDiagnostic?.fit_score && (
        <div className="bg-[#12131A] border border-[#0FEFFD]/20 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-[#0FEFFD]" />
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Fit Score del Cliente</span>
          </div>
          <span className="text-[#0FEFFD] font-black text-lg">{currentDiagnostic.fit_score}/20</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LADO IZQUIERDO: BIBLIOTECA DE SCRIPTS */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Code size={18} className="text-[#0FEFFD]" />
              <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Biblioteca de Scripts (IA)</h3>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-all">WhatsApp</button>
              <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-all">Instagram</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scripts.map((script) => (
              <div key={script.id} className="bg-[#12131A] border border-white/5 p-6 rounded-[32px] hover:border-[#E625FF]/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">{script.icon}</div>
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all">
                    {script.icon}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-500 bg-white/5 px-3 py-1 rounded-full">{script.type}</span>
                </div>
                <h4 className="text-white font-bold text-lg mb-2 tracking-tight group-hover:text-[#0FEFFD] transition-colors">{script.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed italic mb-8 group-hover:text-gray-300 transition-colors">{script.content}</p>
                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center justify-center gap-2 hover:bg-[#E625FF]/20 hover:text-white hover:border-[#E625FF]/50 transition-all">
                  <Copy size={14} /> Copiar Script
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LADO DERECHO: FLUJO DE TAREAS */}
        <div className="lg:col-span-5">
          <div className="bg-[#12131A] border border-white/5 p-8 rounded-[48px] h-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0FEFFD]/5 blur-[60px] -z-10" />

            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">
              Flujo de Tareas Operativas
              {planMejora.length > 0 && <span className="text-[#0FEFFD] ml-2">({planMejora.length} acciones)</span>}
            </h3>

            {/* Tabs Técnicos */}
            <div className="flex bg-black/40 rounded-full p-1.5 mb-10 border border-white/5">
              <button
                onClick={() => setActiveTaskTab('hoy')}
                className={`flex-1 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all ${activeTaskTab === 'hoy' ? 'bg-[#E625FF] text-white shadow-[0_0_20px_#E625FF]' : 'text-gray-600'}`}
              >
                Hoy (Live)
              </button>
              <button
                onClick={() => setActiveTaskTab('semana')}
                className={`flex-1 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all ${activeTaskTab === 'semana' ? 'bg-white/10 text-white' : 'text-gray-600'}`}
              >
                Próximos 7d
              </button>
            </div>

            {/* Listado con Linea de Tiempo Playbook */}
            <div className="space-y-12 relative ml-2">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-[#E625FF] via-[#0FEFFD] to-transparent opacity-20" />

              {tasks.map((task) => (
                <div key={task.id} className="relative pl-10 group">
                  <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${task.statusColor} z-10 transition-transform group-hover:scale-125`} />
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-base tracking-tight group-hover:text-[#0FEFFD] transition-colors">{task.title}</h4>
                      <p className="text-[11px] text-gray-500 leading-tight group-hover:text-gray-400 transition-colors">{task.desc}</p>
                      <div className="flex items-center gap-4 pt-3">
                        <span className="flex items-center gap-1.5 text-[10px] text-gray-600 font-bold font-mono">
                          <Clock size={12} className="text-[#E625FF]" /> {task.time}
                        </span>
                        <button className="text-[9px] font-black uppercase tracking-widest text-[#0FEFFD] hover:underline decoration-wavy">Marcar como lista</button>
                      </div>
                    </div>
                    <span className="text-[8px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-500 tracking-widest group-hover:border-[#E625FF]/30 transition-all">
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-full mt-12 py-5 rounded-[24px] border border-[#0FEFFD]/20 bg-[#0FEFFD]/5 hover:bg-[#0FEFFD]/10 hover:border-[#0FEFFD]/50 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              <RefreshCw size={20} className={`text-[#0FEFFD] ${refreshing ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-1000`} />
              <span className="text-white font-black text-xs uppercase tracking-[0.3em]">Sincronizar Terminal OS</span>
            </button>
          </div>
        </div>

      </div>

      {/* FOOTER TERMINAL */}
      <footer className="flex flex-col md:flex-row items-center justify-between p-8 bg-[#12131A] border border-white/5 rounded-[32px] gap-6">
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#0FEFFD] animate-ping" />
            <span className="text-[10px] text-[#0FEFFD] font-black uppercase tracking-[0.3em]">
              {currentDiagnostic?.status === 'completed' ? 'Diagnóstico Completado' : 'Sincronización Activa'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className={`${planMejora.length > 0 ? 'text-[#0FEFFD]' : 'text-gray-700'}`} />
            <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
              {planMejora.length > 0 ? `${planMejora.length} acciones en plan de mejora` : 'Scripts de IA validados'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-[#E625FF]" />
            <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">Latencia: 12ms</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-700 font-mono font-black italic bg-black/40 px-4 py-2 rounded-full border border-white/5">
          RIBUZZ-SYSTEM-IMPLEMENTATION // TERMINAL-01
        </div>
      </footer>
    </div>
  );
};

export default ImplementationView;