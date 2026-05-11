import React, { createContext, useState, useContext } from 'react';

const DiagnosticContext = createContext();

export const DiagnosticProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Sección A: Identificación
    lead: {},
    // Sección B: Contexto
    contexto: {},
    // Sección C: Las 12 Variables (Los 70 campos irán aquí)
    variables: {
      oferta: {},
      monetizacion: {},
      cac: {},
      // ... rest of the 12 modules
    },
    status: 'INTAKE', // INTAKE, PROCESSING, COCKPIT, PLAYBOOK, IMPLEMENTATION
    currentStep: 1,
  });

  const updateField = (section, subSection, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: { ...prev[section][subSection], ...data }
      }
    }));
  };

  return (
    <DiagnosticContext.Provider value={{ formData, setFormData, updateField }}>
      {children}
    </DiagnosticContext.Provider>
  );
};

export const useDiagnostic = () => useContext(DiagnosticContext);