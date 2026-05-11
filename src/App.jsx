import React, { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import { useDiagnostic } from './context/DiagnosticContext'

// IMPORTACIÓN DE VISTAS
import IntakeView from './components/views/IntakeView'
import ProcessingView from './components/views/ProcessingView'
import PlaybookView from './components/views/PlaybookView'
import ImplementationView from './components/views/ImplementationView'
import CockpitView from './components/views/CockpitView' // <--- Nueva
import LoginView from './components/views/LoginView'     // <--- Nueva

function App() {
  const context = useDiagnostic();
  // Estado local para Auth (MVP)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Extraemos con seguridad del contexto
  const formData = context?.formData || { status: 'COCKPIT' }; 
  const setFormData = context?.setFormData || (() => {});

  // Función para disparar el diagnóstico desde cualquier vista
  const startNewDiagnostic = () => {
    setFormData(prev => ({ ...prev, status: 'INTAKE' }));
  };

  // Renderizador de Vistas con el try-catch que ya tenías
  const renderView = () => {
    try {
      switch (formData.status) {
        case 'COCKPIT': 
          return <CockpitView onStartDiagnostic={startNewDiagnostic} />;
        
        case 'INTAKE': 
          return <IntakeView />;
        
        case 'PROCESSING': 
          return <ProcessingView />;
        
        case 'PLAYBOOK': 
          return <PlaybookView />;
        
        case 'IMPLEMENTATION': 
          return <ImplementationView />;

        default: 
          return <CockpitView onStartDiagnostic={startNewDiagnostic} />;
      }
    } catch (error) {
      console.error("Error renderizando vista:", error);
      return (
        <div className="p-20 text-red-500 font-mono flex flex-col items-center justify-center min-h-[60vh]">
          <span className="text-6xl mb-4">⚠️</span>
          <h2 className="text-xl font-bold">ERROR CRÍTICO DE NAVEGACIÓN</h2>
          <p className="text-gray-500 mt-2">Falla en el sector: {formData.status}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-widest"
          >
            Reiniciar Sistemas
          </button>
        </div>
      );
    }
  }

  // Lógica de Autenticación (Si no está logueado, bloqueamos todo el layout)
  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-[#0B0B10] text-white font-sans selection:bg-[#E625FF]/30 overflow-hidden">
      {/* Sidebar persistente: Controla el status global */}
      <Sidebar 
        activeTab={formData.status} 
        setActiveTab={(tab) => setFormData(prev => ({ ...prev, status: tab }))} 
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header />
        
        {/* Fondo Galáctico Persistente que ya tenías (¡No se toca!) */}
        <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#E625FF]/5 blur-[120px] rounded-full -z-10" />
        <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[40%] bg-[#0FEFFD]/5 blur-[120px] rounded-full -z-10" />

        {/* Contenedor de Scroll de las Vistas dinámicas */}
        <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default App