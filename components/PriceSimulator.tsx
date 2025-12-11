import React, { useState, useMemo } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';

enum MaterialType {
  WOOD = 'Kayu Jati Belanda',
  IRON = 'Besi Hollow + Galvalum',
  ALUMINIUM = 'Aluminium Kaca',
  CONTAINER = 'Modifikasi Container'
}

interface PriceSimulationConfig {
  length: number;
  width: number;
  height: number;
  material: MaterialType;
  hasRoof: boolean;
  hasWheels: boolean;
  hasNeonBox: boolean;
}

const PriceSimulator: React.FC = () => {
  const [config, setConfig] = useState<PriceSimulationConfig>({
    length: 100,
    width: 60,
    height: 200,
    material: MaterialType.WOOD,
    hasRoof: true,
    hasWheels: true,
    hasNeonBox: false,
  });

  const estimatedPrice = useMemo(() => {
    // Base Calculation Logic (Simplified for Demo)
    // Calculate Volume factor roughly
    const volumeFactor = (config.length + config.width) / 100; // Meters linear equivalent
    
    let basePricePerMeter = 0;
    switch (config.material) {
      case MaterialType.WOOD: basePricePerMeter = 1500000; break;
      case MaterialType.IRON: basePricePerMeter = 1800000; break;
      case MaterialType.ALUMINIUM: basePricePerMeter = 1200000; break;
      case MaterialType.CONTAINER: basePricePerMeter = 2500000; break;
    }

    let total = volumeFactor * basePricePerMeter;

    if (config.hasRoof) total += 500000;
    if (config.hasWheels) total += 300000;
    if (config.hasNeonBox) total += 850000;

    return Math.round(total);
  }, [config]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <section id="simulation" className="py-20 bg-slate-800 text-white relative overflow-hidden scroll-mt-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2">
            <h2 className="text-orange-500 font-semibold tracking-wide uppercase mb-2">Simulasi Harga</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Hitung Estimasi Biaya Booth Impian Anda</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Gunakan kalkulator cerdas ini untuk mendapatkan perkiraan awal biaya pembuatan booth atau gerobak. Pilih ukuran dan spesifikasi material yang Anda inginkan.
            </p>
            
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 flex items-start gap-4">
              <AlertCircle className="text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-white mb-1">Catatan Penting</h5>
                <p className="text-slate-300 text-sm">Harga yang ditampilkan adalah <span className="font-semibold text-orange-400">estimasi kasar</span>. Harga final dapat berubah tergantung kompleksitas desain, finishing, dan harga material saat produksi.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full bg-white text-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 bg-orange-500 text-white flex justify-between items-center">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <Calculator /> Kalkulator Booth
              </h4>
              <div className="text-right">
                <p className="text-xs opacity-90">Estimasi Total</p>
                <p className="text-2xl font-bold">{formatRupiah(estimatedPrice)}</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Dimensions */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Panjang (cm)</label>
                  <input 
                    type="number" 
                    value={config.length}
                    onChange={(e) => setConfig({...config, length: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lebar (cm)</label>
                  <input 
                    type="number" 
                    value={config.width}
                    onChange={(e) => setConfig({...config, width: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tinggi (cm)</label>
                  <input 
                    type="number" 
                    value={config.height}
                    onChange={(e) => setConfig({...config, height: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pilihan Material</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.values(MaterialType).map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setConfig({...config, material: mat})}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                        config.material === mat 
                        ? 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500' 
                        : 'border-slate-200 text-slate-600 hover:border-orange-300'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tambahan</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={config.hasRoof}
                      onChange={(e) => setConfig({...config, hasRoof: e.target.checked})}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-slate-700">Atap / Kanopi (+ Rp 500rb)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={config.hasWheels}
                      onChange={(e) => setConfig({...config, hasWheels: e.target.checked})}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-slate-700">Roda Gerobak (+ Rp 300rb)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={config.hasNeonBox}
                      onChange={(e) => setConfig({...config, hasNeonBox: e.target.checked})}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-slate-700">Neon Box Branding (+ Rp 850rb)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSimulator;