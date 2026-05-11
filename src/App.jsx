import React from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import { useDiagnostic } from './context/DiagnosticContext'

// IMPORTACIÓN DE VISTAS (Asegúrate de que los archivos existan)
import IntakeView from './components/views/IntakeView'
import ProcessingView from './components/views/ProcessingView'
import PlaybookView from './components/views/PlaybookView'

function App() {
  const { formData, setFormData } = useDiagnostic();

  const renderView = () => {
    try {
      switch (formData.status) {
        case 'INTAKE': 
          return <IntakeView />;
        case 'PROCESSING': 
          return <ProcessingView />;
        case 'PLAYBOOK': 
          return <PlaybookView />;
        case 'COCKPIT': 
          return (
            <div className="p-20 text-center">
              <h2 className="text-4xl font-bold text-white shadow-neon-magenta">CENTRO DE MANDO</h2>
              <p className="text-gray-400 mt-4">Bienvenido, Comandante.</p>
            </div>
          );
        default: 
          return <IntakeView />;
      }
    } catch (error) {
      console.error("Error renderizando vista:", error);
      return <div className="p-20 text-red-500 font-mono">ERROR DE SISTEMA: RECARGUE LA TERMINAL</div>;
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0B0B10] text-white font-sans selection:bg-[#E625FF]/30">
      <Sidebar 
        activeTab={formData.status} 
        setActiveTab={(tab) => setFormData(prev => ({ ...prev, status: tab }))} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        {/* Fondo Galáctico */}
        <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#E625FF]/5 blur-[120px] rounded-full -z-10" />
        <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[40%] bg-[#0FEFFD]/5 blur-[120px] rounded-full -z-10" />

        <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default App