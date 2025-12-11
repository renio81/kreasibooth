import React, { useState, useEffect } from 'react';
import { Menu, X, Store } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Portofolio', href: '#portfolio' },
    { name: 'Desain AI', href: '#ai-consultant' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'Simulasi', href: '#simulation' },
    { name: 'Pemesanan', href: '#order' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Handle background transparency
      setIsScrolled(window.scrollY > 50);

      // Handle active section
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 120; // Offset for fixed header

      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`p-2 rounded-lg text-white transition-colors ${isScrolled ? 'bg-orange-500' : 'bg-orange-500'}`}>
              <Store size={24} />
            </div>
            <span className={`font-bold text-2xl ${isScrolled ? 'text-slate-800' : 'text-slate-800 md:text-white'} transition-colors`}>
              Kreasi<span className="text-orange-500">Booth</span>
            </span>
          </div>
          
          <div className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`text-sm font-semibold transition-all duration-300 relative px-2 py-1 ${
                  activeSection === link.href.substring(1)
                    ? 'text-orange-500'
                    : isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform transition-transform duration-300 origin-left ${
                  activeSection === link.href.substring(1) ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </a>
            ))}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors ${isScrolled ? 'text-slate-800' : 'text-slate-800 md:text-white'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute w-full bg-white border-t border-slate-100 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`block px-3 py-4 text-base font-medium rounded-md transition-colors ${
                activeSection === link.href.substring(1)
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-slate-600 hover:text-orange-500 hover:bg-slate-50'
              }`}
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;