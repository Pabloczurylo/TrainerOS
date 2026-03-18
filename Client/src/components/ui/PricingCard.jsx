import React from 'react';
import { Check } from 'lucide-react';

const PricingCard = ({ title, price, features, isPopular, onSelect }) => {
  return (
    <div className={`relative flex flex-col p-6 rounded-2xl bg-[#131826] border transition-all ${isPopular ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-[#1e293b]'}`}>
      
      {isPopular && (
        <span className="absolute -top-3 right-6 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
          POPULAR
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-white">${price}</span>
          <span className="text-gray-400 text-sm">/mes</span>
        </div>
      </div>

      <button 
        onClick={onSelect}
        className={`w-full py-2.5 rounded-lg font-bold text-sm transition-colors mb-8 ${isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25' : 'bg-[#1e293b] hover:bg-[#2a3143] text-gray-300'}`}
      >
        {isPopular ? 'Mejorar Plan' : 'Seleccionar Plan'}
      </button>

      <ul className="space-y-4 flex-1">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="mt-0.5 bg-blue-500/20 p-0.5 rounded-full text-blue-500 shrink-0">
               <Check size={14} className="stroke-[3]" />
            </div>
            <span className="text-[#94a3b8] text-sm font-medium">{feature}</span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default PricingCard;
