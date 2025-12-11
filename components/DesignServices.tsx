
import React, { useState } from 'react';
import { PenTool, ArrowRight, CheckCircle2, X, User, Store, MessageSquare, Send, Upload, FileImage, AlertCircle, Layout, Monitor } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getIconComponent } from '../utils/iconMapper';

const DesignServices: React.FC = () => {
  const { generalSettings, designServices } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    concept: ''
  });

  const handleOrderClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', businessName: '', concept: '' });
    setAttachmentName(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Halo Admin, saya ingin memesan *Jasa Desain 3D*.

*DETAIL ORDER*
Paket: ${selectedService}
Nama: ${formData.name}
Nama Usaha: ${formData.businessName || '-'}

*KONSEP / REQUEST*
${formData.concept}
${attachmentName ? `\n*CATATAN*: Saya memiliki lampiran foto referensi (${attachmentName}) yang akan saya kirim setelah chat ini terbuka.` : ''}

Mohon info selanjutnya untuk pembayaran dan proses pengerjaan. Terima kasih.`;

    // Fallback number if settings is empty (though it shouldn't be)
    const targetPhone = generalSettings.whatsapp || "6281316426495"; 
    
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`, '_blank');
    closeModal();
  };

  // Helper function to get theme classes based on color string
  const getThemeClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          card: 'border-blue-100 hover:border-blue-500',
          bgIcon: 'bg-blue-100',
          iconColor: 'text-blue-600',
          btn: 'group-hover:bg-blue-600'
        };
      case 'orange':
        return {
          card: 'border-orange-100 hover:border-orange-500',
          bgIcon: 'bg-orange-100',
          iconColor: 'text-orange-600',
          btn: 'group-hover:bg-orange-500'
        };
      case 'purple':
        return {
          card: 'border-purple-100 hover:border-purple-500',
          bgIcon: 'bg-purple-100',
          iconColor: 'text-purple-600',
          btn: 'group-hover:bg-purple-600'
        };
      case 'green':
        return {
          card: 'border-green-100 hover:border-green-500',
          bgIcon: 'bg-green-100',
          iconColor: 'text-green-600',
          btn: 'group-hover:bg-green-600'
        };
      case 'red':
        return {
          card: 'border-red-100 hover:border-red-500',
          bgIcon: 'bg-red-100',
          iconColor: 'text-red-600',
          btn: 'group-hover:bg-red-600'
        };
      default:
        return {
          card: 'border-blue-100 hover:border-blue-500',
          bgIcon: 'bg-blue-100',
          iconColor: 'text-blue-600',
          btn: 'group-hover:bg-blue-600'
        };
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full mb-4">
            <PenTool size={14} className="text-slate-500" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Jasa Desain Profesional</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
            Visualisasikan Ide <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Sebelum Produksi</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Belum siap bikin boothnya? Pesan desainnya dulu! Kami melayani jasa pembuatan desain 3D untuk berbagai keperluan usaha Anda dengan harga terjangkau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {designServices.map((service, index) => {
            const theme = getThemeClasses(service.colorTheme);
            return (
              <div 
                key={service.id}
                className={`relative rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group bg-white ${theme.card}`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <span className="animate-pulse">★</span> Paling Laris
                  </div>
                )}
                
                <div className={`w-16 h-16 rounded-2xl ${theme.bgIcon} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={theme.iconColor}>
                     {getIconComponent(service.iconName, { size: 32 })}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h4>
                <p className="text-slate-500 text-sm mb-6 min-h-[40px] leading-relaxed">{service.description}</p>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-sm text-slate-400 font-medium">Mulai dari</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs font-bold text-slate-500">Rp</span>
                    <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{service.price}</span>
                    <span className="text-slate-500 text-sm font-medium">{service.unit}</span>
                  </div>
                  {service.note && <p className="text-xs text-orange-500 mt-2 font-medium bg-orange-50 inline-block px-2 py-1 rounded">{service.note}</p>}
                </div>

                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                      <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleOrderClick(service.title)}
                  className={`w-full py-3.5 rounded-xl border border-slate-200 font-bold text-slate-600 ${theme.btn} group-hover:text-white group-hover:border-transparent transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow-lg`}
                >
                  Pesan Desain <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* POPUP MODAL FORM ORDER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Form Order Desain</h3>
                <p className="text-sm text-orange-500 font-medium">{selectedService}</p>
              </div>
              <button 
                onClick={closeModal}
                className="bg-white text-slate-400 hover:text-red-500 p-2 rounded-full border border-slate-200 hover:bg-red-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-slate-800"
                    placeholder="Nama Anda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Usaha / Brand</label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-slate-800"
                    placeholder="Contoh: Kopi Senja (Opsional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Konsep / Deskripsi</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
                  <textarea 
                    required
                    rows={3}
                    value={formData.concept}
                    onChange={(e) => setFormData({...formData, concept: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-slate-800 resize-none"
                    placeholder="Ceritakan keinginan desain Anda (warna, gaya, referensi, dll)..."
                  />
                </div>
              </div>

              {/* FILE UPLOAD SECTION */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Referensi Gambar (Opsional)</label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center gap-1">
                        <div className={`p-2 rounded-full ${attachmentName ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-500'} transition-colors`}>
                            {attachmentName ? <FileImage size={20} /> : <Upload size={20} />}
                        </div>
                        {attachmentName ? (
                            <div>
                                <p className="text-xs font-bold text-green-600 truncate max-w-[200px]">{attachmentName}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-xs font-medium text-slate-600">Klik untuk upload foto</p>
                            </div>
                        )}
                    </div>
                </div>
                {attachmentName && (
                    <p className="text-[10px] text-orange-500 mt-1 flex items-start gap-1">
                        <AlertCircle size={10} className="mt-0.5 flex-shrink-0" />
                        File dikirim manual di WhatsApp.
                    </p>
                )}
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                >
                  <Send size={18} />
                  Kirim ke WhatsApp
                </button>
                <p className="text-center text-xs text-slate-400 mt-3">
                  Anda akan diarahkan ke WhatsApp Admin untuk konfirmasi.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default DesignServices;
