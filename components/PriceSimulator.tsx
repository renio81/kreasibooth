import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PricingItem } from '../types';

interface PriceSimulationConfig {
  length: number;
  width: number;
  height: number;
  materialId: number;
  selectedAddons: number[];
}

const PriceSimulator: React.FC = () => {
  const { pricingItems } = useData();
  
  // Filter items for cleaner usage
  const materials = useMemo(() => pricingItems.filter(p => p.type === 'material'), [pricingItems]);
  const addons = useMemo(() => pricingItems.filter(p => p.type === 'addon'), [pricingItems]);

  const [config, setConfig] = useState<PriceSimulationConfig>({
    length: 100,
    width: 60,
    height: 200,
    materialId: 0,
    selectedAddons: [],
  });

  // Set default material when data loads
  useEffect(() => {
    if (materials.length > 0 && config.materialId === 0) {
        setConfig(prev => ({ ...prev, materialId: materials[0].id }));
    }
  }, [materials, config.materialId]);

  const estimatedPrice = useMemo(() => {
    // Base Calculation Logic
    // Calculate Volume factor roughly for estimation
    const volumeFactor = (config.length + config.width) / 100; // Meters linear equivalent
    
    // Find selected material price
    const selectedMaterial = materials.find(m => m.id === config.materialId);
    const basePricePerMeter = selectedMaterial ? selectedMaterial.price : 0;

    let total = volumeFactor * basePricePerMeter;

    // Add addons prices
    config.selectedAddons.forEach(addonId => {
        const addon = addons.find(a => a.id === addonId);
        if (addon) {
            total += addon.price;
        }
    });

    return Math.round(total);
  }, [config, materials, addons]);

  const toggleAddon = (addonId: number) => {
    setConfig(prev => {
        const isSelected = prev.selectedAddons.includes(addonId);
        if (isSelected) {
            return { ...prev, selectedAddons: prev.selectedAddons.filter(id => id !== addonId) };
        } else {
            return { ...prev, selectedAddons: [...prev.selectedAddons, addonId] };
        }
    });
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  if (materials.length === 0) {
      return null; // Don't render if no data
  }

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
                  {materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setConfig({...config, materialId: mat.id})}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                        config.materialId === mat.id 
                        ? 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500' 
                        : 'border-slate-200 text-slate-600 hover:border-orange-300'
                      }`}
                    >
                      {mat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tambahan</label>
                <div className="space-y-3">
                  {addons.map((addon) => (
                      <label key={addon.id} className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 p-2 rounded -ml-2 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={config.selectedAddons.includes(addon.id)}
                          onChange={() => toggleAddon(addon.id)}
                          className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 accent-orange-500"
                        />
                        <span className="text-slate-700 text-sm flex-1">{addon.name}</span>
                        <span className="text-xs font-bold text-orange-500">+ {formatRupiah(addon.price)}</span>
                      </label>
                  ))}
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