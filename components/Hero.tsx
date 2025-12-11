
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
  const { heroSlides } = useData();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrent(current === 0 ? heroSlides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrent(current === heroSlides.length - 1 ? 0 : current + 1);
  };

  const scrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (heroSlides.length === 0) {
    return (
      <section id="home" className="relative h-screen w-full bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">Selamat Datang di KreasiBooth</h1>
          <p className="mt-4">Silakan tambahkan banner slide di Admin Dashboard.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg max-w-4xl leading-tight">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl drop-shadow-md">
              {slide.subtitle}
            </p>
            <a
              href="#order"
              onClick={scrollToOrder}
              className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center gap-2 transform hover:scale-105 shadow-xl"
            >
              Pesan Sekarang
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white backdrop-blur-sm transition-all"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white backdrop-blur-sm transition-all"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? 'bg-orange-500 w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
