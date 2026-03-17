import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientForm from './pages/ClientForm'
import Routines from './pages/Routines'
import CreateRoutine from './pages/CreateRoutine'
import RoutineDetail from './pages/RoutineDetail'
import ExercisesList from './pages/ExercisesList'
import ExerciseForm from './pages/ExerciseForm'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute' 
import ClientRoutineDetail from './pages/ClientRoutineDetail';
import ClientExerciseDetail from './pages/ClientExerciseDetail';
import MainLayout from './components/layout/MainLayout'; 
import Landing from './pages/Landing'; 

function App() {
  return (
    <Routes>
      {/* --- RUTAS PÚBLICAS --- */}
      
      {/* La raíz ahora es la Landing Page */}
      <Route path="/" element={<Landing />} />
      
      {/* Login sigue siendo público */}
      <Route path="/login" element={<Login />} />

      {/* --- RUTAS PROTEGIDAS --- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          
          {/* IMPORTANTE: El Dashboard ahora vive en '/dashboard' para no chocar con la Landing */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Clientes */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/edit/:id" element={<ClientForm />} /> {/* Recuperamos el edit que faltaba */}

          {/* Rutinas */}
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/new" element={<CreateRoutine />} />
          <Route path="/routines/edit/:id" element={<CreateRoutine />} />
          <Route path="/routines/:id" element={<RoutineDetail />} />
          
          {/* Vista Cliente */}
          <Route path="/rutina" element={<ClientRoutineDetail />} />
          <Route path="/ejercicio" element={<ClientExerciseDetail />} />

          {/* Ejercicios */}
          <Route path="/exercises" element={<ExercisesList />} />
          <Route path="/exercises/new" element={<ExerciseForm />} />
          <Route path="/exercises/edit/:id" element={<ExerciseForm />} />
        </Route>
      </Route>

      {/* Redirección por defecto: Si la ruta no existe, mandamos a la Landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App