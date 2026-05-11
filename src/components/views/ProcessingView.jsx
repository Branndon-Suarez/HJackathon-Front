import React, { useEffect, useState, useCallback } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import { Loader2, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

const ProcessingView = () => {
  const { currentDiagnostic, fetchPlaybookResults, setFormData } = useDiagnostic();
  const [phase, setStep] = useState(0);
  const [error, setError] = useState(null);

  const phases = currentDiagnostic?.status === 'completed'
    ? [
        "Sincronizando 70 campos con el núcleo... ✓",
        "Identificando fugas de capital... ✓",
        "Generando Hyper-Loop de 9 pasos... ✓",
        "Estructurando Playbook Estratégico... ✓",
        "¡Diagnóstico completado!"
      ]
    : [
        "Sincronizando 70 campos con el núcleo...",
        "Identificando fugas de capital...",
        "Generando Hyper-Loop de 9 pasos...",
        "Estructurando Playbook Estratégico..."
      ];

  const pollDiagnostic = useCallback(async () => {
    if (!currentDiagnostic) return;

    try {
      const result = await fetchPlaybookResults(currentDiagnostic.id);
      if (result && result.status === 'completed') {
        setFormData(prev => ({ ...prev, status: 'PLAYBOOK' }));
      } else if (result && result.status === 'failed') {
        setError('El diagnóstico falló. Por favor, reintenta.');
      }
      // If still processing, poll again
      else if (result && result.status === 'processing') {
        setTimeout(pollDiagnostic, 3000);
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  }, [currentDiagnostic, fetchPlaybookResults, setFormData]);

  useEffect(() => {
    // If diagnostic is already completed, go straight to playbook
    if (currentDiagnostic?.status === 'completed') {
      const timer = setTimeout(() => {
        setFormData(prev => ({ ...prev, status: 'PLAYBOOK' }));
      }, 3000);
      return () => clearTimeout(timer);
    }

    // If diagnostic is processing, poll for completion
    if (currentDiagnostic?.status === 'processing') {
      pollDiagnostic();
    }

    // Cycle through phases for visual effect
    const interval = setInterval(() => {
      setStep(prev => (prev < phases.length - 1 ? prev + 1 : prev));
    }, currentDiagnostic?.status === 'completed' ? 800 : 1500);

    // If not yet processing, start processing after a delay
    if (currentDiagnostic && currentDiagnostic.status === 'pending') {
      const startTimer = setTimeout(async () => {
        try {
          await pollDiagnostic();
        } catch (err) {
          setError('Error al iniciar el procesamiento');
        }
      }, 2000);
      return () => {
        clearInterval(interval);
        clearTimeout(startTimer);
      };
    }

    return () => clearInterval(interval);
  }, [currentDiagnostic, pollDiagnostic, phases.length, setFormData]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center space-y-4">
          <AlertCircle size={48} className="text-red-500 mx-auto drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
          <h2 className="text-2xl font-display font-bold text-red-400 tracking-tighter uppercase">
            Error de Procesamiento
          </h2>
          <p className="text-gray-400 text-sm">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setFormData(prev => ({ ...prev, status: 'INTAKE' }));
            }}
            className="mt-4 px-6 py-3 bg-[#E625FF]/20 border border-[#E625FF]/30 rounded-full text-[10px] font-black text-[#E625FF] uppercase tracking-widest hover:bg-[#E625FF]/30 transition-all"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-white tracking-tighter uppercase">
            {currentDiagnostic?.status === 'completed' ? 'Diagnóstico Completado' : 'Procesando Diagnóstico'}
          </h2>
          <div className="h-8">
            <p className="text-[#E625FF] font-mono text-sm tracking-[0.2em] uppercase animate-bounce">
              {phases[phase]}
            </p>
          </div>

          {currentDiagnostic?.status !== 'completed' && (
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#E625FF] to-[#0FEFFD] shadow-[0_0_10px_#E625FF] animate-loading-bar" />
            </div>
          )}

          {currentDiagnostic?.status === 'completed' && (
            <div className="flex items-center justify-center gap-2 text-[#0FEFFD] font-mono text-[10px] animate-pulse">
              <CheckCircle2 size={12} />
              <span>FIT SCORE: {currentDiagnostic.fit_score || 0}%</span>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] p-4">
      <div className="relative max-w-md w-full text-center">
        <div className="absolute inset-0 bg-[#E625FF]/10 blur-[100px] rounded-full animate-pulse" />

        <div className="relative z-10 space-y-8">
          <div className="flex justify-center">
            <div className="p-6 rounded-full border-2 border-[#0FEFFD]/20 animate-pulse">
              {error ? (
                <AlertCircle size={48} className="text-red-500 drop-shadow-[0_0_15px_#ef4444]" />
              ) : currentDiagnostic?.status === 'completed' ? (
                <CheckCircle2 size={48} className="text-[#0FEFFD] drop-shadow-[0_0_15px_#0FEFFD]" />
              ) : (
                <Zap size={48} className="text-[#0FEFFD] drop-shadow-[0_0_15px_#0FEFFD]" />
              )}
            </div>
          </div>

          {renderContent()}

          <div className="flex items-center justify-center gap-2 text-gray-500 font-mono text-[10px]">
            <Loader2 size={12} className={`${error ? '' : 'animate-spin'}`} />
            <span>{error ? 'ERROR' : 'MOTOR RiBuzz AI ACTIVO'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingView;