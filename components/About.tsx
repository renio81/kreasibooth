
import React from 'react';
import { Hammer, Users, Award, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { generalSettings } = useData();

  return (
    <section id="about" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-100 rounded-full z-0"></div>
            <img 
              src={generalSettings.aboutImage} 
              alt="Workshop KreasiBooth" 
              className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[400px]"
            />
          </div>
          
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-orange-500 font-semibold tracking-wide uppercase">Tentang Kami</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
              {generalSettings.aboutTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
              {generalSettings.aboutDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                  <Hammer size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Custom Design</h4>
                  <p className="text-sm text-slate-500">Sesuai keinginan Anda</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Tim Ahli</h4>
                  <p className="text-sm text-slate-500">Tukang berpengalaman</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Kualitas Premium</h4>
                  <p className="text-sm text-slate-500">Material pilihan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Tepat Waktu</h4>
                  <p className="text-sm text-slate-500">Pengerjaan terukur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
