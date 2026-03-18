import React from 'react';
import PricingCard from '../components/ui/PricingCard';
import FaqItem from '../components/ui/FaqItem';

const Planes = () => {
  const plans = [
    {
      title: 'Básico',
      price: '0',
      isPopular: false,
      features: [
        'Hasta 5 alumnos',
        'Rutinas básicas',
        'App para alumnos'
      ]
    },
    {
      title: 'Pro',
      price: '29',
      isPopular: true,
      features: [
        'Hasta 50 alumnos',
        'Integración YouTube completa',
        'Soporte prioritario',
        'Reportes de progreso'
      ]
    },
    {
      title: 'Ilimitado',
      price: '99',
      isPopular: false,
      features: [
        'Alumnos ilimitados',
        'Marca blanca',
        'API Access',
        'Multi-entrenador'
      ]
    }
  ];

  const faqs = [
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puedes subir o bajar de nivel tu plan en cualquier momento desde la configuración de tu cuenta. Los cambios se prorratearán en tu próxima factura de manera automática.',
      defaultExpanded: true
    },
    {
      question: '¿Qué incluye la marca blanca?',
      answer: 'La marca blanca te permite personalizar la aplicación con tu propio logo, colores de marca y dominio personalizado para que tus alumnos vean tu identidad.',
      defaultExpanded: false
    },
    {
      question: '¿Cómo funciona el soporte prioritario?',
      answer: 'Los usuarios del plan Pro tienen acceso directo por WhatsApp y email con un tiempo de respuesta garantizado menor a 2 horas durante horario hábil.',
      defaultExpanded: false
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 w-full text-white pb-10 max-w-6xl mx-auto pt-4">
      
      {/* Header */}
      <div className="text-left mb-10 px-2 lg:px-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Planes de Suscripción</h1>
        <p className="text-[#94a3b8] font-medium text-sm md:text-base">Elige el plan que mejor se adapte a tu crecimiento como entrenador.</p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-2 lg:px-0">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>

      {/* Separator */}
      <div className="px-4 lg:px-0">
        <div className="my-16 border-t border-[#1e293b] w-full max-w-4xl mx-auto"></div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16 px-4 lg:px-0">
        <h2 className="text-2xl font-bold text-white mb-8">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} {...faq} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Planes;
