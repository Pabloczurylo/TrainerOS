import { create } from 'zustand'

const getInitialUser = () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;
  try {
    const parsedUser = JSON.parse(storedUser);
    return {
      ...parsedUser,
      isAdmin: parsedUser.is_admin === 1 || parsedUser.is_admin === true || parsedUser.isAdmin === true
    };
  } catch (err) {
    return null;
  }
};

export const useAuthStore = create((set) => ({
  // 1. ESTADO INICIAL
  // Intentamos leer del almacenamiento local por si refresca la página
  token: localStorage.getItem('token') || null,
  user: getInitialUser(),
  isAuthenticated: !!localStorage.getItem('token'), // Es true si existe el token

  // 2. ACCIÓN DE LOGIN
  // Recibe los datos del servidor y los guarda en memoria y en el disco duro (localStorage)
  login: (userData, token) => {
    // Normalizamos isAdmin para que siempre exista en el frontend (viene como is_admin desde backend)
    const normalizedUser = {
      ...userData,
      isAdmin: userData.is_admin === 1 || userData.is_admin === true || userData.isAdmin === true
    };

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(normalizedUser))
    
    set({ 
      token: token, 
      user: normalizedUser, 
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