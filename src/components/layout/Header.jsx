import React from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import { cn } from '../../services/utils';

export default function Header() {
  const { formData } = useDiagnostic();
  
  // Solo mostramos el progreso si estamos activamente en el diagnóstico
  const isIntake = formData.status === 'INTAKE';
  const progress = (formData.currentStep / 12) * 100;

  return (
    <header className="h-[76px] sticky top-0 z-40 bg-[#0B0B10]/80 backdrop-blur-xl border-b border-white/10 flex items-center px-8 justify-between">
      <div className="flex flex-col gap-1 w-full max-w-md">
        {isIntake ? (
          <>
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] text-[#E625FF] font-bold uppercase tracking-widest animate-pulse">
                Escaneando Sistema Comercial
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                Módulo {formData.currentStep} de 12
              </span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#E625FF] to-[#0FEFFD] transition-all duration-700 ease-out shadow-[0_0_10px_#E625FF]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#0FEFFD] animate-pulse" />
             <span className="text-[10px] text-[#0FEFFD] font-bold uppercase tracking-widest">RiBuzz OS // Conexión Estable</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:block px-3 py-1 rounded-full border border-white/10 text-gray-400 text-[10px] font-mono">
          NODE_RI-B2B_ACTIVE
        </div>
      </div>
    </header>
  );
}