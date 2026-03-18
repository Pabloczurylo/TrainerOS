import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqItem = ({ question, answer, defaultExpanded = false }) => {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  return (
    <div className="border border-[#1e293b] bg-[#131826] rounded-xl overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left hover:bg-[#1a2133] transition-colors"
      >
        <span className="text-white font-bold text-sm">{question}</span>
        {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>
      
      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-[#94a3b8] text-sm leading-relaxed border-t border-[#1e293b]/50">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FaqItem;
