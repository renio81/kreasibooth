import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useData } from '../context/DataContext';

const FloatingWidget: React.FC = () => {
  const { generalSettings } = useData();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openWhatsApp = () => {
    const phone = generalSettings.whatsapp || "6281316426495";
    window.open(`https://wa.me/${phone}?text=Halo%20Admin%20KreasiBooth,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20booth.`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-end">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 transform hover:-translate-y-1 ${
          showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp size={24} />
      </button>
      
      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative group"
        aria-label="Chat WhatsApp"
      >
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none">
          Konsultasi Gratis 💬
          {/* Arrow tooltip */}
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white transform rotate-45"></span>
        </span>

        {/* Notification Dot Animation */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
        
        <MessageCircle size={28} fill="currentColor" className="animate-pulse-slow" />
      </button>
    </div>
  );
};

export default FloatingWidget;