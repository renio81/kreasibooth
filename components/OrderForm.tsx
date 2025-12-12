import React, { useState, useMemo, useEffect } from 'react';
import { Phone, MapPin, Mail, Instagram, Send, Calculator, AlertCircle, ShoppingCart, Upload, FileImage, CreditCard } from 'lucide-react';
import { PriceSimulationConfig, PricingItem } from '../types';
import { useData } from '../context/DataContext';
import PaymentModal from './PaymentModal';

const OrderForm: React.FC = () => {
  const { generalSettings, pricingItems } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });

  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const materials = pricingItems.filter(item => item.type === 'material');
  const addons = pricingItems.filter(item => item.type === 'addon');

  const [config, setConfig] = useState<PriceSimulationConfig>({
    length: 100,
    width: 60,
    height: 200,
    materialId: 0,
    selectedAddons: [],
  });

  useEffect(() => {
    if (materials.length > 0 && config.materialId === 0) {
      setConfig(prev => ({ ...prev, materialId: materials[0].id }));
    }
  }, [materials]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const estimatedPrice = useMemo(() => {
    const volumeFactor = (config.length + config.width) / 100; 
    const selectedMaterial = materials.find(m => m.id === config.materialId);
    const basePricePerMeter = selectedMaterial ? selectedMaterial.price : 0;

    let total = volumeFactor * basePricePerMeter;

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
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setIsPaymentOpen(false);

    const selectedMaterial = materials.find(m => m.id === config.materialId);
    const selectedAddonNames = config.selectedAddons
      .map(id => addons.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const message = `Halo CiptaKreasiBooth, saya telah melakukan pembayaran:

*STATUS PEMBAYARAN: LUNAS ✅*
ID Transaksi: ${transactionId}

*DATA PEMESAN*
Nama: ${formData.name}
No WA: ${formData.phone}
Alamat: ${formData.address || '-'}

*DETAIL ORDER (Dari Website)*
Ukuran: ${config.length} x ${config.width} x ${config.height} cm
Material: ${selectedMaterial ? selectedMaterial.name : '-'}
Add-ons: ${selectedAddonNames || 'Tidak ada'}
*Total Biaya: ${formatRupiah(estimatedPrice)}*

*PESAN TAMBAHAN*
${formData.message || '-'}
${attachmentName ? `\n*CATATAN*: Saya akan mengirimkan lampiran foto/desain (${attachmentName}) setelah chat ini terbuka.` : ''}`;

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
            Isi formulir di bawah ini. Anda dapat melakukan pembayaran aman melalui Payment Gateway kami.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
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
                  <p className="text-sm text-blue-700">Harga ini hanyalah estimasi. Pembayaran akan menjamin antrian produksi.</p>
               </div>

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
                </div>
              </div>

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
                </div>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-1/2 flex flex-col h-full">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex-grow">
               <div className="mb-8 border-b border-slate-100 pb-6">
                 <h4 className="text-2xl font-bold text-slate-800 mb-2">Formulir Pemesanan</h4>
                 <p className="text-slate-500">Lengkapi data untuk melanjutkan ke pembayaran.</p>
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
                      <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi Pengiriman</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        placeholder="Kota / Alamat"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lampiran (Opsional)</label>
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
                                <p className="text-sm font-bold text-green-600 truncate max-w-[200px]">{attachmentName}</p>
                            ) : (
                                <p className="text-sm font-medium text-slate-600">Upload referensi gambar</p>
                            )}
                        </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pesan Tambahan</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-3 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    <CreditCard size={20} />
                    <span>Lanjut ke Pembayaran</span>
                  </button>
               </form>
            </div>

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

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={estimatedPrice}
        itemName="Pembuatan Booth Custom"
        customerName={formData.name || 'Pelanggan'}
        onSuccess={handlePaymentSuccess}
      />
    </section>
  );
};

export default OrderForm;