// src/pages/Landing.jsx
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Services from '../components/landing/Services'
import Stats from '../components/landing/Stats'
import About from '../components/landing/About'

const Landing = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <About />
      
      <footer className="py-12 text-center text-gray-500 text-sm border-t border-gray-800/50 bg-[#0a0a0a]">
        <p>© {new Date().getFullYear()} Lautaro Lencina. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default Landing