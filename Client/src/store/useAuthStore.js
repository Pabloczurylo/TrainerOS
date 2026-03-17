import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  // 1. ESTADO INICIAL
  // Intentamos leer del almacenamiento local por si refresca la página
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token'), // Es true si existe el token

  // 2. ACCIÓN DE LOGIN
  // Recibe los datos del servidor y los guarda en memoria y en el disco duro (localStorage)
  login: (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    set({ 
      token: token, 
      user: userData, 
      isAuthenticated: true 
    })
  },

  // 3. ACCIÓN DE LOGOUT
  // Limpia todo para cerrar sesión
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    set({ 
      token: null, 
      user: null, 
      isAuthenticated: false 
    })
  }
}))