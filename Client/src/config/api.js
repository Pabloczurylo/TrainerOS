// Archivo: src/config/api.js

// Esta lógica selecciona automáticamente la URL correcta:
// - Si estás en Vercel (Producción), usa la variable de entorno VITE_API_URL.
// - Si estás en tu PC (Local), usa http://localhost:3000/api por defecto.

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';