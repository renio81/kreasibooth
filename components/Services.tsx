import React from 'react';
import { useData } from '../context/DataContext';
import { getIconComponent } from '../utils/iconMapper';
import { 
  CheckCircle2,
  Users,
  Zap
} from 'lucide-react';

const Services: React.FC = () => {
  const { services, products } = useData();

  return (
    <section id="services" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-orange-500 font-semibold tracking-wide uppercase mb-2">Layanan Kami</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800">Solusi Lengkap Bisnis Anda</h3>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Dari sketsa kasar hingga menjadi tempat usaha yang siap menghasilkan cuan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* Kolom 1: Lingkup Pekerjaan */}
          <div className="space-y-8">
            <h4 className="text-2xl font-bold text-slate-800 border-l-4 border-orange-500 pl-4">
              Lingkup Pekerjaan
            </h4>
            <div className="space-y-6">
              {services.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className={`flex-shrink-0 w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 text-white`}>
                    {getIconComponent(item.iconName, { size: 24 })}
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h5>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom 2: Daftar Produk */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-fit">
             <h4 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-500 pl-4 mb-8">
              Produk Spesialis Kami
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="p-4 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 transition-all cursor-default flex items-center gap-3 group"
                >
                  <div className="text-slate-400 group-hover:text-orange-500 transition-colors">
                    {getIconComponent(product.iconName, { size: 20 })}
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-700 text-sm group-hover:text-slate-900">{product.name}</h6>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold group-hover:text-orange-400">
                      {product.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={18} className="text-green-500" />
                <span className="text-sm font-medium text-slate-600">Garansi Konstruksi 6 Bulan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-500" />
                <span className="text-sm font-medium text-slate-600">Gratis Konsultasi Desain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 shadow-2xl transform transition-all hover:scale-[1.01]">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-black/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                <Users size={16} className="text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Mitra UMKM & Corporate</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                Siap Melayani Skala <span className="text-yellow-300">Satuan</span> hingga <span className="text-yellow-300">Produksi Massal</span>
              </h3>
              <p className="text-orange-50 text-lg leading-relaxed max-w-2xl">
                Apapun latar belakang bisnis Anda—baru mulai usaha, UMKM, Franchise, Perusahaan Besar, Resto, atau Cafe—kami siap mewujudkan booth impian Anda.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full lg:w-auto">
               <div className="flex-1 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex flex-col items-center sm:items-start gap-2 hover:bg-white/20 transition-colors">
                 <div className="bg-white text-orange-600 p-2.5 rounded-full shadow-lg">
                    <Zap size={24} fill="currentColor" />
                 </div>
                 <div className="text-white">
                    <p className="text-xs opacity-90 uppercase tracking-wider font-semibold">Harga</p>
                    <p className="font-bold text-lg">Sangat Bersaing</p>
                 </div>
               </div>
               
               <div className="flex-1 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex flex-col items-center sm:items-start gap-2 hover:bg-white/20 transition-colors">
                 <div className="bg-white text-orange-600 p-2.5 rounded-full shadow-lg">
                    <CheckCircle2 size={24} />
                 </div>
                 <div className="text-white">
                    <p className="text-xs opacity-90 uppercase tracking-wider font-semibold">Kualitas</p>
                    <p className="font-bold text-lg">Terjamin Kokoh</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;