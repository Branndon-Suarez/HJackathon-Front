import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // <--- ESTO ES VITAL
import App from './App.jsx'
import { DiagnosticProvider } from './context/DiagnosticContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DiagnosticProvider>
      <App />
    </DiagnosticProvider>
  </React.StrictMode>,
)