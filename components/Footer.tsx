
import React from 'react';
import { useData } from '../context/DataContext';
import { Lock } from 'lucide-react';

interface FooterProps {
  onAdminLogin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminLogin }) => {
  const { generalSettings } = useData();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="font-bold text-2xl text-white">Kreasi<span className="text-orange-500">Booth</span></span>
          <p className="mt-2 text-sm">© {new Date().getFullYear()} KreasiBooth Indonesia. All rights reserved.</p>
          <p className="text-xs mt-1 text-slate-500">{generalSettings.email}</p>
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <button 
            onClick={onAdminLogin}
            className="flex items-center gap-1 text-slate-600 hover:text-orange-500 transition-colors"
            title="Admin Login"
          >
            <Lock size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
