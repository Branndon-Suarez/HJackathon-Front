import React, { useEffect, useState } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import { Loader2, Zap } from 'lucide-react';

const ProcessingView = () => {
  const { setFormData } = useDiagnostic();
  const [phase, setStep] = useState(0);

  const phases = [
    "Sincronizando 70 campos con el núcleo...",
    "Identificando fugas de capital...",
    "Generando Hyper-Loop de 9 pasos...",
    "Estructurando Playbook Estratégico..."
  ];

  useEffect(() => {
    // Ciclo de textos
    const interval = setInterval(() => {
      setStep(prev => (prev < phases.length - 1 ? prev + 1 : prev));
    }, 1500);

    // Salto automático al Playbook tras 6 segundos
    const timer = setTimeout(() => {
      setFormData(prev => ({ ...prev, status: 'PLAYBOOK' }));
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [setFormData]);

  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] p-4">
      <div className="relative max-w-md w-full text-center">
        {/* Efecto de Luces */}
        <div className="absolute inset-0 bg-[#E625FF]/10 blur-[100px] rounded-full animate-pulse" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex justify-center">
            <div className="p-6 rounded-full border-2 border-[#0FEFFD]/20 animate-pulse">
              <Zap size={48} className="text-[#0FEFFD] drop-shadow-[0_0_15px_#0FEFFD]" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-white tracking-tighter uppercase">
              Procesando Diagnóstico
            </h2>
            <div className="h-8">
              <p className="text-[#E625FF] font-mono text-sm tracking-[0.2em] uppercase animate-bounce">
                {phases[phase]}
              </p>
            </div>
            
            {/* Barra de progreso técnica */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#E625FF] to-[#0FEFFD] shadow-[0_0_10px_#E625FF] animate-loading-bar" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 font-mono text-[10px]">
            <Loader2 size={12} className="animate-spin" />
            <span>ESTABLECIENDO CONEXIÓN CON n8n ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingView;