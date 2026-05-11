import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const diagnosticService = {
  // Verificar salud del backend
  ping: () => api.get('/api/v1/ping'),
  
  // Enviar los 70 campos a n8n vía Rails
  submitDiagnostic: (data) => api.post('/api/v1/diagnostics', data),
  
  // Obtener resultados una vez procesados
  getResults: (id) => api.get(`/api/v1/diagnostics/${id}`),
};

export default api;