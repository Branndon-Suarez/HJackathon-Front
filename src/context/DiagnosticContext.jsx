import React, { createContext, useState, useContext, useCallback } from 'react';
import { diagnosticService } from '../services/api';

const DiagnosticContext = createContext();

export const DiagnosticProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Sección A: Identificación
    lead: {},
    // Sección B: Contexto
    contexto: {},
    // Sección C: Las 12 Variables (Los 70 campos irán aquí)
    variables: {
      problema: {},
      solucion: {},
      cliente: {},
      oferta: {},
      ecuacion_valor_hormozi: {},
      monetizacion: {},
      adquisicion: {},
      cac: {},
      conversion: {},
      seguimiento: {},
      escalamiento: {},
      ejecucion: {},
    },
    status: 'LANDING',
    currentStep: 1,
  });
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth_token'));
  const [currentLead, setCurrentLead] = useState(null);
  const [currentDiagnostic, setCurrentDiagnostic] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist auth token
  const login = useCallback((token) => {
    localStorage.setItem('auth_token', token);
    setAuthToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setAuthToken(null);
    setCurrentLead(null);
    setCurrentDiagnostic(null);
    setFormData({ status: 'LANDING', currentStep: 1 });
  }, []);

  // Submit login credentials to backend
  const handleLogin = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await diagnosticService.login(email, password);
      const { token, lead } = response.data;
      login(token);
      setCurrentLead(lead);
      setFormData(prev => ({ ...prev, status: 'COCKPIT' }));
      return { success: true, lead };
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al iniciar sesión');
      return { success: false, error: err.response?.data?.error?.message };
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  // Create a new lead (for registration flow)
  const handleRegister = useCallback(async (companyId, leadData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await diagnosticService.createLead(companyId, leadData);
      setCurrentLead(response.data.data);
      return { success: true, lead: response.data.data };
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al registrar');
      return { success: false, error: err.response?.data?.error?.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Start a new diagnostic
  const startNewDiagnostic = useCallback(async (companyId, leadId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await diagnosticService.createDiagnostic(leadId, {
        diagnostic: { status: 'pending' }
      });
      const diagnostic = response.data.data;
      setCurrentDiagnostic(diagnostic);
      setFormData(prev => ({ ...prev, status: 'INTAKE', currentStep: 1, diagnosticId: diagnostic.id }));
      return diagnostic;
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al crear diagnóstico');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Continue existing diagnostic
  const continueDiagnostic = useCallback(async (diagnosticId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await diagnosticService.getDiagnostic(diagnosticId);
      const diagnostic = response.data.data;
      setCurrentDiagnostic(diagnostic);

      // Restore form data from diagnostic if raw_responses exist
      if (diagnostic.raw_responses) {
        // Restore saved progress
        setFormData(prev => ({
          ...prev,
          status: diagnostic.status === 'completed' ? 'PLAYBOOK' : 'INTAKE',
          currentStep: diagnostic.current_step || 1,
          diagnosticId: diagnostic.id,
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          status: 'INTAKE',
          currentStep: 1,
          diagnosticId: diagnostic.id,
        }));
      }
      return diagnostic;
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al cargar diagnóstico');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save raw responses as user progresses through intake
  const saveResponse = useCallback(async (diagnosticId, section, data) => {
    try {
      await diagnosticService.updateDiagnostic(diagnosticId, {
        diagnostic: { raw_responses: { [section]: data } }
      });
    } catch (err) {
      console.error('Error saving response:', err);
    }
  }, []);

  // Submit completed diagnostic and trigger AI processing
  const submitDiagnostic = useCallback(async (diagnosticId, rawResponses) => {
    try {
      setIsLoading(true);
      setError(null);

      // Update diagnostic with all responses and mark as completed
      await diagnosticService.updateDiagnostic(diagnosticId, {
        diagnostic: {
          raw_responses: rawResponses,
          status: 'completed'
        }
      });

      // Trigger RiBuzz AI processing
      setFormData(prev => ({ ...prev, status: 'PROCESSING' }));

      const response = await diagnosticService.runRiBuzzDiagnostic(diagnosticId);
      const diagnostic = response.data.data;
      setCurrentDiagnostic(diagnostic);

      // Auto-advance to Playbook after processing
      setTimeout(() => {
        setFormData(prev => ({ ...prev, status: 'PLAYBOOK' }));
      }, 1500);

      return diagnostic;
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al procesar diagnóstico');
      setFormData(prev => ({ ...prev, status: 'INTAKE' }));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch playbook results from backend
  const fetchPlaybookResults = useCallback(async (diagnosticId) => {
    try {
      setIsLoading(true);
      const response = await diagnosticService.getDiagnostic(diagnosticId);
      const diagnostic = response.data.data;
      setCurrentDiagnostic(diagnostic);
      return diagnostic;
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al obtener resultados');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateField = useCallback((section, subSection, data) => {
    setFormData(prev => {
      if (subSection == null) {
        return {
          ...prev,
          [section]: { ...prev[section], ...data }
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: { ...prev[section]?.[subSection], ...data }
        }
      };
    });
  }, []);

  const value = {
    formData,
    setFormData,
    authToken,
    currentLead,
    currentDiagnostic,
    companies,
    setCompanies,
    isLoading,
    error,
    login: handleLogin,
    logout,
    register: handleRegister,
    startNewDiagnostic,
    continueDiagnostic,
    saveResponse,
    submitDiagnostic,
    fetchPlaybookResults,
    updateField,
  };

  return (
    <DiagnosticContext.Provider value={value}>
      {children}
    </DiagnosticContext.Provider>
  );
};

export const useDiagnostic = () => useContext(DiagnosticContext);