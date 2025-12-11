import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useData } from '../context/DataContext';

const Testimonials: React.FC = () => {
  const { testimonials } = useData();
  // Duplikasi array untuk efek infinite loop yang mulus jika data sedikit
  const displayTestimonials = testimonials.length > 0 
    ? [...testimonials, ...testimonials, ...testimonials].slice(0, 10) 
    : [];

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden scroll-mt-24">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-orange-500 font-semibold tracking-wide uppercase mb-2">Testimoni</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800">Apa Kata Mitra Kami?</h3>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas kami. Berikut adalah pengalaman nyata dari para pengusaha yang telah bermitra dengan KreasiBooth.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        {/* Gradient overlays for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none hidden md:block" />

        <div className="flex animate-marquee w-max gap-8 px-4">
          {displayTestimonials.map((testi, index) => (
            <div 
              key={`${testi.id}-${index}`} 
              className="w-[300px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < testi.rating ? "currentColor" : "none"} strokeWidth={i < testi.rating ? 0 : 2} />
                  ))}
                </div>
                <Quote className="text-slate-200 group-hover:text-orange-200 transition-colors" size={32} />
              </div>
              
              <p className="text-slate-600 mb-6 italic leading-relaxed min-h-[80px]">"{testi.content}"</p>
              
              <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                <img 
                  src={testi.image} 
                  alt={testi.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100" 
                />
                <div>
                  <h5 className="font-bold text-slate-900">{testi.name}</h5>
                  <p className="text-xs text-orange-500 font-semibold uppercase tracking-wider">{testi.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;