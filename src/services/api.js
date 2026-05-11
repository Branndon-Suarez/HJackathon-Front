import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token JWT en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const diagnosticService = {
  // Verificar salud del backend
  ping: () => api.get('/ping'),

  // Autenticación - login con email y password
  login: (email, password) => api.post('/auth/login', { email, password }),

  // Obtener todas las compañías
  getCompanies: () => api.get('/companies'),

  // Obtener una compañía específica
  getCompany: (companyId) => api.get(`/companies/${companyId}`),

  // Crear compañía
  createCompany: (data) => api.post('/companies', data),

  // Actualizar compañía
  updateCompany: (companyId, data) => api.put(`/companies/${companyId}`, data),

  // Obtener leads de una compañía
  getLeads: (companyId) => api.get(`/companies/${companyId}/leads`),

  // Crear lead
  createLead: (companyId, data) => api.post(`/companies/${companyId}/leads`, data),

  // Obtener lead específico
  getLead: (leadId) => api.get(`/leads/${leadId}`),

  // Actualizar lead
  updateLead: (leadId, data) => api.put(`/leads/${leadId}`, data),

  // Obtener diagnósticos de un lead
  getDiagnostics: (leadId) => api.get(`/leads/${leadId}/diagnostics`),

  // Crear diagnóstico
  createDiagnostic: (leadId, data) => api.post(`/leads/${leadId}/diagnostics`, data),

  // Obtener diagnóstico específico
  getDiagnostic: (diagnosticId) => api.get(`/diagnostics/${diagnosticId}`),

  // Actualizar diagnóstico
  updateDiagnostic: (diagnosticId, data) => api.put(`/diagnostics/${diagnosticId}`, data),

  // Ejecutar diagnóstico RiBuzz AI
  runRiBuzzDiagnostic: (diagnosticId) => api.post(`/diagnostics/${diagnosticId}/ribuzz_diagnostic`),

  // Obtener plan estratégico del diagnóstico
  getStrategyPlan: (diagnosticId) => api.get(`/diagnostics/${diagnosticId}/strategy_plan`),

  // Crear/actualizar plan estratégico
  updateStrategyPlan: (diagnosticId, data) => api.put(`/diagnostics/${diagnosticId}/strategy_plan`, data),

  // Reportes de auditoría
  getReports: () => api.get('/reports'),
  getReport: (reportId) => api.get(`/reports/${reportId}`),
  latestReport: () => api.get('/reports/latest'),
  downloadReportPdf: (reportId) => api.get(`/reports/${reportId}/download_pdf`, { responseType: 'blob' }),

  // Chatbot
  createConversation: () => api.post('/chatbot/conversations', { conversation: { status: 'active' } }),
  getConversation: (id) => api.get(`/chatbot/conversations/${id}`),
  getMessages: (conversationId) => api.get(`/chatbot/conversations/${conversationId}/messages`),
  sendMessage: (conversationId, content) =>
    api.post(`/chatbot/conversations/${conversationId}/messages`, { message: { content } }),
};

export default api;