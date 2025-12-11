
import React, { useState, useMemo, useEffect } from 'react';
import { Phone, MapPin, Mail, Instagram, Send, Calculator, AlertCircle, ShoppingCart, Upload, FileImage } from 'lucide-react';
import { PriceSimulationConfig, PricingItem } from '../types';
import { useData } from '../context/DataContext';

const OrderForm: React.FC = () => {
  const { generalSettings, pricingItems } = useData();

  // State untuk Form Data Diri
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });

  // State untuk Attachment
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  // Filter materials and addons
  const materials = pricingItems.filter(item => item.type === 'material');
  const addons = pricingItems.filter(item => item.type === 'addon');

  // State untuk Kalkulator
  const [config, setConfig] = useState<PriceSimulationConfig>({
    length: 100,
    width: 60,
    height: 200,
    materialId: 0, // Will default in useEffect
    selectedAddons: [],
  });

  // Set default material when items are loaded
  useEffect(() => {
    if (materials.length > 0 && config.materialId === 0) {
      setConfig(prev => ({ ...prev, materialId: materials[0].id }));
    }
  }, [materials]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Logika Perhitungan Harga Dinamis
  const estimatedPrice = useMemo(() => {
    // Volume factor roughly (Linear meter equivalent approximation for logic)
    const volumeFactor = (config.length + config.width) / 100; 
    
    // Get selected material price
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedMaterial = materials.find(m => m.id === config.materialId);
    const selectedAddonNames = config.selectedAddons
      .map(id => addons.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    // Format Pesan WhatsApp
    const message = `Halo KreasiBooth, saya ingin memesan/konsultasi:

*DATA PEMESAN*
Nama: ${formData.name}
No WA: ${formData.phone}
Alamat: ${formData.address || '-'}

*DETAIL ESTIMASI (Dari Website)*
Ukuran: ${config.length} x ${config.width} x ${config.height} cm
Material: ${selectedMaterial ? selectedMaterial.name : '-'}
Add-ons: ${selectedAddonNames || 'Tidak ada'}
*Estimasi Harga: ${formatRupiah(estimatedPrice)}*

*PESAN TAMBAHAN*
${formData.message || '-'}
${attachmentName ? `\n*CATATAN*: Saya akan mengirimkan lampiran foto/desain (${attachmentName}) setelah chat ini terbuka.` : ''}`;

    // Encode dan buka WhatsApp (gunakan nomor dari settings)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${generalSettings.whatsapp}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="order" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-orange-500 font-semibold tracking-wide uppercase mb-2">Pemesanan</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800">Mulai Bisnis Anda Sekarang</h3>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Isi formulir di bawah ini untuk konsultasi langsung via WhatsApp. Anda bisa menghitung estimasi biaya terlebih dahulu menggunakan kalkulator kami.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* KOLOM 1: KALKULATOR (KIRI) */}
          <div id="simulation" className="w-full xl:w-1/2 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden scroll-mt-24">
            <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Calculator size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Kalkulator Estimasi</h4>
                  <p className="text-xs text-slate-300">Hitung budget awal Anda</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Perkiraan Biaya</p>
                <p className="text-2xl font-bold text-orange-400">{formatRupiah(estimatedPrice)}</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
               <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
                  <AlertCircle className="text-blue-500 flex-shrink-0" size={20} />
                  <p className="text-sm text-blue-700">Harga ini hanyalah estimasi kasar sistem. Harga final ditentukan setelah diskusi detail desain.</p>
               </div>

               {/* Dimensi */}
               <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Panjang (cm)</label>
                  <input 
                    type="number" 
                    value={config.length}
                    onChange={(e) => setConfig({...config, length: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lebar (cm)</label>
                  <input 
                    type="number" 
                    value={config.width}
                    onChange={(e) => setConfig({...config, width: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tinggi (cm)</label>
                  <input 
                    type="number" 
                    value={config.height}
                    onChange={(e) => setConfig({...config, height: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-semibold text-slate-700"
                  />
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Pilih Material Utama</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {materials.map((mat) => (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setConfig({...config, materialId: mat.id})}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left flex items-center justify-between group ${
                        config.materialId === mat.id 
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm ring-1 ring-orange-500' 
                        : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-slate-50'
                      }`}
                    >
                      {mat.name}
                      {config.materialId === mat.id && <div className="w-2 h-2 rounded-full bg-orange-500"></div>}
                    </button>
                  ))}
                  {materials.length === 0 && <p className="text-sm text-slate-400 italic">Tidak ada material tersedia.</p>}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Fitur Tambahan</label>
                <div className="space-y-3">
                  {addons.map((addon) => (
                      <label key={addon.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                        <span className="text-slate-700 font-medium">{addon.name} <span className="text-xs text-orange-500 font-normal">(+ {formatRupiah(addon.price)})</span></span>
                        <input 
                          type="checkbox" 
                          checked={config.selectedAddons.includes(addon.id)}
                          onChange={() => toggleAddon(addon.id)}
                          className="w-5 h-5 text-orange-500 accent-orange-500"
                        />
                      </label>
                  ))}
                  {addons.length === 0 && <p className="text-sm text-slate-400 italic">Tidak ada fitur tambahan tersedia.</p>}
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM 2: FORM ORDER (KANAN) */}
          <div className="w-full xl:w-1/2 flex flex-col h-full">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex-grow">
               <div className="mb-8 border-b border-slate-100 pb-6">
                 <h4 className="text-2xl font-bold text-slate-800 mb-2">Formulir Pemesanan</h4>
                 <p className="text-slate-500">Data Anda akan dikirim langsung ke WhatsApp Admin.</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        placeholder="08xx-xxxx-xxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi Pengiriman (Kota)</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        placeholder="Contoh: Jakarta Selatan"
                      />
                    </div>
                  </div>

                  {/* FILE UPLOAD SECTION */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lampiran Foto / Desain (Opsional)</label>
                    <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center gap-2">
                            <div className={`p-3 rounded-full ${attachmentName ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-500'} transition-colors`}>
                                {attachmentName ? <FileImage size={24} /> : <Upload size={24} />}
                            </div>
                            {attachmentName ? (
                                <div>
                                    <p className="text-sm font-bold text-green-600 truncate max-w-[200px]">{attachmentName}</p>
                                    <p className="text-xs text-slate-400">File siap dikirim</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Klik untuk upload foto referensi</p>
                                    <p className="text-xs text-slate-400 mt-1">Format JPG/PNG</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {attachmentName && (
                        <p className="text-xs text-orange-500 mt-2 flex items-start gap-1">
                            <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                            File gambar akan dikirimkan manual oleh Anda setelah chat WhatsApp terbuka.
                        </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pesan Tambahan / Request Khusus</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                      placeholder="Ceritakan detail model, warna, atau kebutuhan khusus lainnya..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-3 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    <Send size={20} />
                    <span>Kirim Pesanan ke WhatsApp</span>
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-4">
                    Dengan mengklik tombol di atas, Anda akan diarahkan ke aplikasi WhatsApp.
                  </p>
               </form>
            </div>

            {/* Kontak Info Mini */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                   <div className="bg-orange-100 p-2 rounded-full text-orange-600"><MapPin size={18} /></div>
                   <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Workshop</p>
                      <p className="text-sm font-medium text-slate-700">{generalSettings.address}</p>
                   </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                   <div className="bg-green-100 p-2 rounded-full text-green-600"><Phone size={18} /></div>
                   <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">WhatsApp</p>
                      <p className="text-sm font-medium text-slate-700">{generalSettings.whatsapp}</p>
                   </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                   <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Instagram size={18} /></div>
                   <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Social</p>
                      <p className="text-sm font-medium text-slate-700">{generalSettings.instagram}</p>
                   </div>
                </div>
                {/* Email Item */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                   <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Mail size={18} /></div>
                   <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                      <p className="text-sm font-medium text-slate-700">{generalSettings.email}</p>
                   </div>
                </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OrderForm;
