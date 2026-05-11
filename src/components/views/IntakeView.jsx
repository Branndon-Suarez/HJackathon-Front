import React, { useState, useMemo, useEffect } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import { ArrowRight, ArrowLeft, Zap, Target, BarChart3, Users, Rocket, ShieldCheck, ClipboardList, AlertCircle, Loader2 } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field, value) {
  if (field.required && !value?.toString().trim()) return 'Este campo es obligatorio';
  if (field.type === 'email' && value?.toString().trim()) {
    if (!EMAIL_REGEX.test(value)) return 'Ingresa un email válido';
  }
  if (field.type === 'number' && value?.toString().trim()) {
    const num = Number(value);
    if (isNaN(num)) return 'Debe ser un número válido';
    if (field.min !== undefined && num < field.min) return `Mínimo: ${field.min}`;
    if (field.max !== undefined && num > field.max) return `Máximo: ${field.max}`;
  }
  if (field.minLength && value?.toString().trim() && value.toString().length < field.minLength) {
    return `Mínimo ${field.minLength} caracteres`;
  }
  return null;
}

const modules = [
  { id: 1, title: "Identificación & Contexto", icon: Users, section: 'lead', fields: [
    { name: "nombre_usuario", label: "Nombre del Responsable", type: "text", placeholder: "Ej: Juan Pérez", required: true, minLength: 2 },
    { name: "correo", label: "Correo Corporativo", type: "email", placeholder: "juan@empresa.com", required: true },
    { name: "telefono", label: "WhatsApp Directo", type: "text", placeholder: "+57 300 000 0000", required: true, minLength: 7 },
    { name: "empresa", label: "Nombre de la Organización", type: "text", placeholder: "RiBuzz Corp", required: true, minLength: 2 },
    { name: "sector", label: "Sector / Industria", type: "text", placeholder: "Ej: SaaS, Consultoría, Retail", required: true },
    { name: "web", label: "Canal Digital (Web/IG)", type: "text", placeholder: "https://...", required: false },
  ]},
  { id: 2, title: "El Problema & Urgencia", icon: Target, section: 'variables', subSection: 'problema', fields: [
    { name: "problema_que_resuelve", label: "¿Qué problema crítico resuelves?", type: "textarea", placeholder: "Describe el dolor principal de tu cliente...", required: true, minLength: 10 },
    { name: "impacto_del_problema", label: "¿Qué pasa si no lo resuelven hoy?", type: "text", placeholder: "Impacto financiero o emocional...", required: true, minLength: 5 },
    { name: "urgencia", label: "Nivel de Urgencia Percibida", type: "select", options: ["Baja", "Media", "Alta", "Crítica"], required: true },
  ]},
  { id: 3, title: "La Solución Única", icon: ShieldCheck, section: 'variables', subSection: 'solucion', fields: [
    { name: "mecanismo_unico", label: "¿Cómo lo resuelves (Mecanismo)?", type: "text", placeholder: "Tu metodología o proceso único...", required: true, minLength: 5 },
    { name: "diferenciador", label: "¿Qué te hace diferente a la competencia?", type: "text", placeholder: "Tu ventaja injusta...", required: true, minLength: 5 },
    { name: "evidencia", label: "¿Tienes evidencia de resultados?", type: "select", options: ["No tengo aún", "Testimonios", "Casos de éxito documentados", "Garantía por contrato"], required: true },
  ]},
  { id: 4, title: "Matriz ICP (Cliente Ideal)", icon: Users, section: 'variables', subSection: 'cliente', fields: [
    { name: "cliente_ideal", label: "Perfil del cliente que SÍ buscas", type: "textarea", placeholder: "Empresa, ticket, mentalidad...", required: true, minLength: 10 },
    { name: "cliente_no_fit", label: "Perfil del cliente que NO priorizas", type: "text", placeholder: "Clientes que quitan tiempo o no pagan...", required: false },
    { name: "decisor", label: "¿Quién toma la decisión final?", type: "text", placeholder: "Ej: CEO, Dueño, Director de Compras", required: true },
  ]},
  { id: 5, title: "Oferta Irresistible", icon: Zap, section: 'variables', subSection: 'oferta', fields: [
    { name: "promesa_principal", label: "¿Cuál es tu promesa de valor?", type: "text", placeholder: "Ej: Duplicamos tu ROI en 90 días", required: true, minLength: 5 },
    { name: "entregables", label: "¿Qué incluye exactamente tu paquete?", type: "textarea", placeholder: "Servicios, productos, bonos...", required: true, minLength: 5 },
    { name: "precio", label: "Precio promedio de la oferta (USD)", type: "number", placeholder: "Ej: 1500", required: true, min: 1 },
  ]},
  { id: 6, title: "Ecuación de Valor", icon: BarChart3, section: 'variables', subSection: 'ecuacion_valor_hormozi', fields: [
    { name: "resultado_sonado", label: "Resultado soñado del cliente", type: "text", placeholder: "Lo que realmente quieren lograr...", required: true, minLength: 3 },
    { name: "tiempo_resultado", label: "Tiempo estimado para ver frutos", type: "text", placeholder: "Ej: 30 días, 6 meses...", required: true },
    { name: "esfuerzo", label: "Esfuerzo/Sacrificio del cliente (1-10)", type: "select", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], required: true },
  ]},
  { id: 7, title: "Monetización", icon: BarChart3, section: 'variables', subSection: 'monetizacion', fields: [
    { name: "ticket_medio", label: "Ticket Medio (Venta promedio)", type: "number", placeholder: "Ej: 500", required: true, min: 1 },
    { name: "facturacion_mensual", label: "Facturación Mensual Promedio", type: "number", placeholder: "Ventas actuales...", required: false, min: 0 },
    { name: "recurrencia", label: "Tipo de Recurrencia", type: "select", options: ["Venta Única", "Suscripción Mensual", "Contrato Anual", "Recompra Frecuente"], required: true },
  ]},
  { id: 8, title: "Adquisición de Clientes", icon: Rocket, section: 'variables', subSection: 'adquisicion', fields: [
    { name: "canal_principal", label: "Canal #1 de adquisición actual", type: "text", placeholder: "Ej: Ads, Referidos, LinkedIn, Frío", required: true },
    { name: "dependencia_referidos", label: "% Dependencia de Referidos (0-100)", type: "number", placeholder: "0 a 100", required: true, min: 0, max: 100 },
    { name: "predictibilidad", label: "¿Es un canal predecible?", type: "select", options: ["Es pura suerte/caos", "Funciona a veces", "Es una máquina predecible"], required: true },
  ]},
  { id: 9, title: "Economía (CAC)", icon: BarChart3, section: 'variables', subSection: 'cac', fields: [
    { name: "inversion_marketing", label: "Inversión Mensual en Marketing (USD)", type: "number", placeholder: "USD al mes", required: true, min: 0 },
    { name: "clientes_nuevos", label: "Clientes Nuevos por Mes", type: "number", placeholder: "Promedio", required: true, min: 0 },
    { name: "conoce_cac", label: "¿Conoces tu CAC (Costo de Adquisición)?", type: "select", options: ["No tengo idea", "Lo estimo", "Lo tengo medido exacto"], required: true },
  ]},
  { id: 10, title: "Conversión de Ventas", icon: Zap, section: 'variables', subSection: 'conversion', fields: [
    { name: "leads_mensuales", label: "¿Cuántos leads recibes al mes?", type: "number", placeholder: "Interesados totales", required: true, min: 0 },
    { name: "tasa_conversion", label: "% Conversión (Lead a Venta)", type: "number", placeholder: "Ej: 10", required: true, min: 0, max: 100 },
    { name: "tiempo_cierre", label: "Tiempo promedio de cierre (Días)", type: "number", placeholder: "Desde el interés al pago", required: true, min: 1 },
  ]},
  { id: 11, title: "Seguimiento", icon: ClipboardList, section: 'variables', subSection: 'seguimiento', fields: [
    { name: "usa_crm", label: "¿Usa algún CRM?", type: "select", options: ["No", "Excel / Notion", "CRM Profesional"], required: true },
    { name: "tiempo_respuesta", label: "Tiempo de respuesta inicial", type: "text", placeholder: "Ej: 5 min, 2 horas, 1 día...", required: true },
    { name: "intentos_seguimiento", label: "Intentos de seguimiento promedio", type: "number", placeholder: "Veces", required: true, min: 1 },
  ]},
  { id: 12, title: "Escalabilidad & Ejecución", icon: Rocket, section: 'variables', subSection: 'escalamiento', fields: [
    { name: "dependencia_fundador", label: "Dependencia del Fundador (1-10)", type: "select", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], required: true },
    { name: "procesos_documentados", label: "¿Tienes procesos documentados?", type: "select", options: ["Nada", "Algunos", "Todo documentado"], required: true },
    { name: "cuello_botella", label: "Principal cuello de botella hoy", type: "text", placeholder: "Lo que más te frena...", required: true, minLength: 5 },
  ]},
];

export default function IntakeView() {
  const { formData, setFormData, updateField, currentDiagnostic, submitDiagnostic, saveResponse } = useDiagnostic();
  const currentModule = modules.find(m => m.id === formData.currentStep) || modules[0];
  const Icon = currentModule.icon;
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (name, value) => {
    if (currentModule.section === 'lead') {
      updateField('lead', null, { [name]: value });
    } else {
      updateField('variables', currentModule.subSection, { [name]: value });
    }
    if (touched[name]) {
      setTouched(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const getFieldValue = (name) => {
    if (currentModule.section === 'lead') {
      return formData.lead?.[name] || '';
    }
    const sec = formData.variables?.[currentModule.subSection];
    return sec?.[name] || '';
  };

  const validateModule = () => {
    const newErrors = {};
    currentModule.fields.forEach(field => {
      const val = getFieldValue(field.name);
      const err = validateField(field, val);
      if (err) newErrors[field.name] = err;
    });
    const allTouched = {};
    currentModule.fields.forEach(f => { allTouched[f.name] = true; });
    setTouched(allTouched);
    return Object.keys(newErrors).length === 0;
  };

  const fieldErrors = useMemo(() => {
    const errs = {};
    currentModule.fields.forEach(field => {
      if (touched[field.name]) {
        const val = getFieldValue(field.name);
        const err = validateField(field, val);
        if (err) errs[field.name] = err;
      }
    });
    return errs;
  }, [currentModule, touched, formData]);

  // Auto-guardar en backend cuando cambian los datos
  useEffect(() => {
    if (currentDiagnostic && formData.currentStep) {
      const timer = setTimeout(() => {
        const allData = {
          lead: formData.lead || {},
          variables: formData.variables || {}
        };
        saveResponse(currentDiagnostic.id, 'step_' + formData.currentStep, allData);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [formData.lead, formData.variables]);

  const handleNext = async () => {
    if (!validateModule()) return;

    if (formData.currentStep < 12) {
      setFormData(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      setTouched({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitting(true);
      const btn = document.querySelector('.finalizar-btn');
      if (btn) {
        btn.innerHTML = `
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Procesando...</span>
        `;
      }

      // Recopilar todos los datos del formulario
      const allResponses = {
        lead: formData.lead || {},
        variables: formData.variables || {}
      };

      if (currentDiagnostic) {
        try {
          // Enviar datos al backend
          await submitDiagnostic(currentDiagnostic.id, allResponses);
        } catch (err) {
          console.error('Error submitting diagnostic:', err);
          // Fallback visual
          setTimeout(() => {
            setFormData(prev => ({ ...prev, status: 'PROCESSING' }));
            setSubmitting(false);
          }, 1500);
        }
      } else {
        setTimeout(() => {
          setFormData(prev => ({ ...prev, status: 'PROCESSING' }));
          setSubmitting(false);
        }, 1500);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-[#181A24]/60 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E625FF]/10 blur-3xl rounded-full" />

        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#E625FF]/20 flex items-center justify-center border border-[#E625FF]/30 shadow-[0_0_15px_#E625FF]">
                <Icon className="text-[#E625FF]" size={24} />
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">
                    Módulo {currentModule.id}: <span className="text-[#0FEFFD]">{currentModule.title}</span>
                </h2>
                <p className="text-gray-400 text-sm mt-1 font-sans">Análisis de precisión comercial en tiempo real.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {currentModule.fields.map((field) => {
            const error = fieldErrors[field.name];
            const value = getFieldValue(field.name);
            return (
            <div key={field.name} className={field.type === 'textarea' ? "md:col-span-2" : ""}>
              <label className="text-[10px] font-bold text-[#E625FF] uppercase tracking-widest ml-2 mb-2 block">
                {field.label}{field.required && <span className="text-[#E625FF]"> *</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  value={value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`w-full bg-[#0B0B10] border ${error ? 'border-red-500/60' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-[#0FEFFD] transition-all outline-none cursor-pointer appearance-none`}
                >
                    <option value="">Seleccionar...</option>
                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`w-full bg-[#0B0B10] border ${error ? 'border-red-500/60' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#0FEFFD] transition-all outline-none resize-none`}
                />
              ) : (
                <input
                  type={field.type}
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`w-full bg-[#0B0B10] border ${error ? 'border-red-500/60' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#0FEFFD] transition-all outline-none`}
                />
              )}
              {error && (
                <div className="flex items-center gap-1.5 mt-1.5 ml-2 text-[10px] text-red-400 font-medium">
                  <AlertCircle size={12} /> {error}
                </div>
              )}
            </div>
          )})}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <button
            onClick={() => setFormData(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))}
            className={`flex items-center gap-2 text-gray-500 hover:text-white transition-colors ${formData.currentStep === 1 ? 'invisible' : ''}`}
          >
            <ArrowLeft size={20} />
            <span>Anterior</span>
          </button>

          <button
            onClick={handleNext}
            disabled={submitting}
            className="bg-gradient-to-r from-[#E625FF] to-[#5B16E6] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(230,37,255,0.4)] hover:scale-105 transition-all active:scale-95 finalizar-btn disabled:opacity-50"
          >
            <span>{formData.currentStep === 12 ? 'Finalizar Auditoría' : 'Siguiente Módulo'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}