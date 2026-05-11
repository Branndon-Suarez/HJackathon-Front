import React from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import { useDiagnostic } from './context/DiagnosticContext'
import ImplementationView from './components/views/ImplementationView'

// IMPORTACIÓN DE VISTAS
import IntakeView from './components/views/IntakeView'
import ProcessingView from './components/views/ProcessingView'
import PlaybookView from './components/views/PlaybookView'

function App() {
  const context = useDiagnostic();
const formData = context?.formData || { status: 'IMPLEMENTATION' }; // Forzamos vista
const setFormData = context?.setFormData || (() => {});

  const renderView = () => {
    try {
      // Nota: Asegúrate de que los nombres de los casos coincidan 
      // con las IDs que envía tu componente Sidebar
      switch (formData.status) {
        case 'INTAKE': 
          return <IntakeView />;
        case 'PROCESSING': 
          return <ProcessingView />;
        case 'PLAYBOOK': 
          return <PlaybookView />;
        case 'IMPLEMENTATION': // <--- NUEVO CASO PARA TAREAS Y SCRIPTS
          return <ImplementationView />;
        case 'COCKPIT': 
          return (
            <div className="p-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-20 h-20 bg-[#E625FF]/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                 <div className="w-10 h-10 bg-[#E625FF] rounded-full shadow-[0_0_30px_#E625FF]" />
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Centro de Mando</h2>
              <p className="text-gray-400 mt-4 font-mono tracking-widest text-xs">SISTEMA OPERATIVO RIBUZZ v2.0 • ONLINE</p>
            </div>
          );
        default: 
          return <IntakeView />;
      }
    } catch (error) {
      console.error("Error renderizando vista:", error);
      return (
        <div className="p-20 text-red-500 font-mono flex flex-col items-center">
          <span className="text-6xl mb-4">⚠️</span>
          ERROR DE SISTEMA: RECARGUE LA TERMINAL
        </div>
      );
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0B0B10] text-white font-sans selection:bg-[#E625FF]/30 overflow-hidden">
      {/* Sidebar persistente */}
      <Sidebar 
        activeTab={formData.status} 
        setActiveTab={(tab) => setFormData(prev => ({ ...prev, status: tab }))} 
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header />
        
        {/* Fondo Galáctico Persistente */}
        <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#E625FF]/5 blur-[120px] rounded-full -z-10" />
        <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[40%] bg-[#0FEFFD]/5 blur-[120px] rounded-full -z-10" />

        {/* Contenedor de Scroll de las Vistas */}
        <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default App