import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Project, Testimonial, ProductItem, ServiceItem, HeroSlide, GeneralSettings, PricingItem, GalleryItem, DesignServiceItem } from '../types';
import { Trash2, Edit, Plus, X, LogOut, RefreshCw, Save, Settings as SettingsIcon, Calculator, Image as ImageIcon, Video, PenTool, Link, FileVideo, Upload } from 'lucide-react';
import { availableIcons, getIconComponent } from '../utils/iconMapper';

interface EditModalProps {
  activeTab: 'projects' | 'testimonials' | 'products' | 'services' | 'hero' | 'pricing' | 'gallery' | 'design_services';
  editingItem: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ activeTab, editingItem, onClose, onSave }) => {
  const [formData, setFormData] = useState<any>(() => {
    if (editingItem) {
      if (activeTab === 'design_services') {
         return { ...editingItem, features: editingItem.features.join('\n') };
      }
      return { ...editingItem };
    }
    
    switch (activeTab) {
      case 'projects': return { category: 'food', title: '', description: '', image: '' };
      case 'testimonials': return { rating: 5, name: '', business: '', content: '', image: '' };
      case 'services': return { color: 'bg-blue-500', iconName: 'PenTool', title: '', description: '' };
      case 'products': return { iconName: 'Store', name: '', type: '' };
      case 'hero': return { title: '', subtitle: '', image: '' };
      case 'pricing': return { name: '', type: 'material', price: 0, unit: 'm' };
      case 'gallery': return { title: '', image: '' };
      case 'design_services': return { title: '', price: '', unit: '', description: '', features: '', note: '', popular: false, iconName: 'Monitor', colorTheme: 'blue' };
      default: return {};
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    const name = e.target.name;

    if (e.target.type === 'checkbox') {
        setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
        setFormData({ ...formData, [name]: val });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'design_services') {
        const featuresArray = formData.features.split('\n').filter((f: string) => f.trim() !== '');
        onSave({ ...formData, features: featuresArray });
    } else {
        onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold">{editingItem ? 'Edit Item' : 'Tambah Item Baru'}</h3>
          <button type="button" onClick={onClose} className="hover:bg-slate-100 p-2 rounded-full transition-colors"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {activeTab === 'projects' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Judul Project</label>
                <input required name="title" value={formData.title || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select name="category" value={formData.category || 'food'} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="food">Kuliner</option>
                  <option value="retail">Retail</option>
                  <option value="service">Jasa</option>
                  <option value="cafe">Cafe/Resto</option>
                  <option value="pameran">Pameran</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar</label>
                <input required name="image" value={formData.image || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea required name="description" value={formData.description || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={3} />
              </div>
            </>
          )}

          {activeTab === 'testimonials' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Pelanggan</label>
                <input required name="name" value={formData.name || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Usaha</label>
                <input required name="business" value={formData.business || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Isi Testimoni</label>
                <textarea required name="content" value={formData.content || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                <input required type="number" min="1" max="5" name="rating" value={formData.rating || 5} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Foto Profil URL</label>
                <input required name="image" value={formData.image || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Produk</label>
                <input required name="name" value={formData.name || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipe</label>
                <input required name="type" value={formData.type || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Outdoor, Indoor, Mobile" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ikon</label>
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-slate-100 rounded">
                        {getIconComponent(formData.iconName || 'Store', { size: 24 })}
                    </div>
                    <select name="iconName" value={formData.iconName || 'Store'} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                        {availableIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                        ))}
                    </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'services' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Layanan</label>
                <input required name="title" value={formData.title || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
                <textarea required name="description" value={formData.description || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ikon</label>
                <div className="flex gap-2 items-center">
                    <div className={`p-2 rounded text-white ${formData.color || 'bg-blue-500'}`}>
                        {getIconComponent(formData.iconName || 'PenTool', { size: 24 })}
                    </div>
                    <select name="iconName" value={formData.iconName || 'PenTool'} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                        {availableIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                        ))}
                    </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Warna Background (Tailwind Class)</label>
                <select name="color" value={formData.color || 'bg-blue-500'} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="bg-blue-500">Biru</option>
                  <option value="bg-orange-500">Orange</option>
                  <option value="bg-yellow-500">Kuning</option>
                  <option value="bg-green-500">Hijau</option>
                  <option value="bg-pink-500">Pink</option>
                  <option value="bg-purple-500">Ungu</option>
                  <option value="bg-red-500">Merah</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'hero' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Judul Utama</label>
                <input required name="title" value={formData.title || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sub Judul</label>
                <textarea required name="subtitle" value={formData.subtitle || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar Banner</label>
                <input required name="image" value={formData.image || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
              </div>
            </>
          )}

          {activeTab === 'pricing' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Item</label>
                <input required name="name" value={formData.name || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Kayu Jati, Roda" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipe</label>
                <select name="type" value={formData.type || 'material'} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="material">Material Utama</option>
                  <option value="addon">Fitur Tambahan (Add-on)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
                <input required type="number" name="price" value={formData.price || 0} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Satuan</label>
                <select name="unit" value={formData.unit || 'm'} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="m">Per Meter (m)</option>
                  <option value="unit">Per Unit (fixed)</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'gallery' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Judul / Caption</label>
                <input required name="title" value={formData.title || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Proses Las" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar</label>
                <input required name="image" value={formData.image || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
              </div>
            </>
          )}

          {activeTab === 'design_services' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Paket Desain</label>
                <input required name="title" value={formData.title || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Harga Display</label>
                    <input required name="price" value={formData.price || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: 350.000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Satuan</label>
                    <input required name="unit" value={formData.unit || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: / booth" />
                  </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
                <textarea required name="description" value={formData.description || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fitur (Satu baris per item)</label>
                <textarea required name="features" value={formData.features || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={4} placeholder="Contoh:&#10;Desain 3D&#10;Revisi 2x&#10;File HD" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Catatan Tambahan (Opsional)</label>
                <input name="note" value={formData.note || ''} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: *Tergantung luas area" />
              </div>
              <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Ikon</label>
                    <div className="flex gap-2 items-center">
                        <div className="p-2 bg-slate-100 rounded">
                            {getIconComponent(formData.iconName || 'Monitor', { size: 24 })}
                        </div>
                        <select name="iconName" value={formData.iconName || 'Monitor'} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                            {availableIcons.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                            ))}
                        </select>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Tema Warna</label>
                    <select name="colorTheme" value={formData.colorTheme || 'blue'} onChange={handleChange} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="blue">Biru (Standard)</option>
                        <option value="orange">Orange (Populer)</option>
                        <option value="purple">Ungu (Premium)</option>
                        <option value="green">Hijau (Fresh)</option>
                        <option value="red">Merah (Bold)</option>
                    </select>
                  </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                 <input type="checkbox" id="popular" name="popular" checked={formData.popular || false} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
                 <label htmlFor="popular" className="text-sm font-medium text-slate-700">Tandai sebagai "Paling Laris"</label>
              </div>
            </>
          )}

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded hover:bg-slate-50 transition-colors">Batal</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-lg">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { 
    projects, addProject, updateProject, deleteProject,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    products, addProduct, updateProduct, deleteProduct,
    services, addService, updateService, deleteService,
    heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide,
    generalSettings, updateGeneralSettings,
    pricingItems, addPricingItem, updatePricingItem, deletePricingItem,
    galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem,
    designServices, addDesignService, updateDesignService, deleteDesignService,
    resetData
  } = useData();

  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials' | 'products' | 'services' | 'hero' | 'settings' | 'gallery' | 'design_services'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'projects' | 'testimonials' | 'products' | 'services' | 'hero' | 'pricing' | 'gallery' | 'design_services'>('projects');
  
  const [settingsForm, setSettingsForm] = useState<GeneralSettings>(generalSettings);

  useEffect(() => {
    setSettingsForm(generalSettings);
  }, [generalSettings]);

  const handleEdit = (item: any, type?: 'pricing' | 'gallery' | 'design_services') => {
    setEditingItem(item);
    if(type) setModalType(type);
    else setModalType(activeTab as any);
    setIsModalOpen(true);
  };

  const handleAdd = (type?: 'pricing' | 'gallery' | 'design_services') => {
    setEditingItem(null);
    if(type) setModalType(type);
    else setModalType(activeTab as any);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (modalType === 'projects') {
      const item = { ...data, id: editingItem?.id || 0 } as Project;
      editingItem ? updateProject(item) : addProject(item);
    } else if (modalType === 'testimonials') {
      const item = { ...data, id: editingItem?.id || 0 } as Testimonial;
      editingItem ? updateTestimonial(item) : addTestimonial(item);
    } else if (modalType === 'products') {
      const item = { ...data, id: editingItem?.id || 0 } as ProductItem;
      editingItem ? updateProduct(item) : addProduct(item);
    } else if (modalType === 'services') {
      const item = { ...data, id: editingItem?.id || 0 } as ServiceItem;
      editingItem ? updateService(item) : addService(item);
    } else if (modalType === 'hero') {
      const item = { ...data, id: editingItem?.id || 0 } as HeroSlide;
      editingItem ? updateHeroSlide(item) : addHeroSlide(item);
    } else if (modalType === 'pricing') {
      const item = { ...data, id: editingItem?.id || 0 } as PricingItem;
      editingItem ? updatePricingItem(item) : addPricingItem(item);
    } else if (modalType === 'gallery') {
      const item = { ...data, id: editingItem?.id || 0 } as GalleryItem;
      editingItem ? updateGalleryItem(item) : addGalleryItem(item);
    } else if (modalType === 'design_services') {
      const item = { ...data, id: editingItem?.id || 0 } as DesignServiceItem;
      editingItem ? updateDesignService(item) : addDesignService(item);
    }
    setIsModalOpen(false);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSettingsForm({ ...settingsForm, workshopVideoUrl: url });
    }
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateGeneralSettings(settingsForm);
    alert('Pengaturan berhasil disimpan!');
  };

  const handleDelete = (id: number, type: 'project' | 'testimonial' | 'product' | 'service' | 'hero' | 'pricing' | 'gallery' | 'design_service') => {
    if (window.confirm('Yakin ingin menghapus item ini?')) {
      if (type === 'project') deleteProject(id);
      if (type === 'testimonial') deleteTestimonial(id);
      if (type === 'product') deleteProduct(id);
      if (type === 'service') deleteService(id);
      if (type === 'hero') deleteHeroSlide(id);
      if (type === 'pricing') deletePricingItem(id);
      if (type === 'gallery') deleteGalleryItem(id);
      if (type === 'design_service') deleteDesignService(id);
    }
  };

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID').format(num);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2">
            <span className="font-bold text-xl">KreasiBooth <span className="text-orange-500">Admin</span></span>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded border border-orange-500/30">CMS Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={resetData} className="text-sm text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                <RefreshCw size={14} /> Reset Data
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-red-900/20">
            <LogOut size={16} /> Keluar
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {[
                { id: 'settings', label: 'Pengaturan' },
                { id: 'hero', label: 'Banner Utama' },
                { id: 'design_services', label: 'Paket Desain' },
                { id: 'gallery', label: 'Galeri & Video' },
                { id: 'projects', label: 'Portofolio' },
                { id: 'services', label: 'Layanan' },
                { id: 'testimonials', label: 'Testimoni' },
                { id: 'products', label: 'Produk' }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                        activeTab === tab.id 
                        ? 'bg-white text-blue-600 shadow-lg ring-1 ring-blue-100 transform -translate-y-1' 
                        : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                    }`}
                >
                    {tab.id === 'settings' && <SettingsIcon size={16}/>}
                    {tab.id === 'design_services' && <PenTool size={16}/>}
                    {tab.label}
                </button>
            ))}
        </div>

        {activeTab === 'settings' ? (
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-4xl mx-auto animate-fade-in">
             <div className="flex items-center justify-between mb-8 border-b pb-4">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800">Pengaturan Umum</h2>
                  <p className="text-slate-500">Kelola informasi perusahaan, kontak, dan harga dasar.</p>
               </div>
               <button onClick={handleSettingsSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-lg transition-transform active:scale-95">
                 <Save size={18} /> Simpan Perubahan
               </button>
             </div>
             
             <form onSubmit={handleSettingsSubmit} className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-orange-500 border-b pb-2">Halaman "Tentang Kami"</h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Judul Utama</label>
                      <input 
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={settingsForm.aboutTitle}
                        onChange={(e) => setSettingsForm({...settingsForm, aboutTitle: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Perusahaan</label>
                      <textarea 
                        rows={6}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={settingsForm.aboutDescription}
                        onChange={(e) => setSettingsForm({...settingsForm, aboutDescription: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar Tentang Kami</label>
                      <input 
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={settingsForm.aboutImage}
                        onChange={(e) => setSettingsForm({...settingsForm, aboutImage: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-orange-500 border-b pb-2">Informasi Kontak</h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp Admin</label>
                      <div className="flex items-center">
                         <span className="bg-slate-100 border border-r-0 rounded-l-lg p-3 text-slate-500 font-medium">+</span>
                         <input 
                          type="text"
                          placeholder="628123456789"
                          className="w-full border rounded-r-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                          value={settingsForm.whatsapp}
                          onChange={(e) => setSettingsForm({...settingsForm, whatsapp: e.target.value})}
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Gunakan format internasional tanpa tanda '+' (contoh: 6281316426495)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Kantor/Workshop</label>
                      <textarea 
                        rows={3}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={settingsForm.address}
                        onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Username Instagram</label>
                      <input 
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={settingsForm.instagram}
                        onChange={(e) => setSettingsForm({...settingsForm, instagram: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input 
                        type="email"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={settingsForm.email}
                        onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                      />
                    </div>
                  </div>
               </div>

               <div className="border-t pt-8">
                  <div className="flex justify-between items-center mb-6 border-b pb-4">
                      <h3 className="text-lg font-bold text-orange-500 flex items-center gap-2">
                        <Calculator size={20} /> Pengaturan Kalkulator & Harga
                      </h3>
                      <button type="button" onClick={() => handleAdd('pricing')} className="text-sm bg-orange-100 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-200 transition-colors font-semibold flex items-center gap-1">
                          <Plus size={14} /> Tambah Item Harga
                      </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <h4 className="font-bold text-slate-700 text-sm uppercase bg-slate-50 p-2 rounded">Harga Material (Per Meter)</h4>
                        <div className="space-y-2">
                           {pricingItems.filter(i => i.type === 'material').map(item => (
                               <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:border-blue-300 transition-colors bg-white">
                                   <div>
                                       <p className="font-medium text-slate-800 text-sm">{item.name}</p>
                                       <p className="text-xs text-slate-500">Rp {formatRupiah(item.price)} / {item.unit}</p>
                                   </div>
                                   <div className="flex gap-1">
                                       <button type="button" onClick={() => handleEdit(item, 'pricing')} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit size={14} /></button>
                                       <button type="button" onClick={() => handleDelete(item.id, 'pricing')} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                                   </div>
                               </div>
                           ))}
                           {pricingItems.filter(i => i.type === 'material').length === 0 && <p className="text-sm text-slate-400 italic p-2">Belum ada data material.</p>}
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h4 className="font-bold text-slate-700 text-sm uppercase bg-slate-50 p-2 rounded">Harga Fitur Tambahan (Add-on)</h4>
                        <div className="space-y-2">
                           {pricingItems.filter(i => i.type === 'addon').map(item => (
                               <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:border-blue-300 transition-colors bg-white">
                                   <div>
                                       <p className="font-medium text-slate-800 text-sm">{item.name}</p>
                                       <p className="text-xs text-slate-500">Rp {formatRupiah(item.price)} / {item.unit}</p>
                                   </div>
                                   <div className="flex gap-1">
                                       <button type="button" onClick={() => handleEdit(item, 'pricing')} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit size={14} /></button>
                                       <button type="button" onClick={() => handleDelete(item.id, 'pricing')} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                                   </div>
                               </div>
                           ))}
                           {pricingItems.filter(i => i.type === 'addon').length === 0 && <p className="text-sm text-slate-400 italic p-2">Belum ada data add-on.</p>}
                        </div>
                     </div>
                  </div>
               </div>
             </form>
           </div>
        ) : activeTab === 'gallery' ? (
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-4xl mx-auto animate-fade-in">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Manajemen Galeri & Video</h2>
             </div>

             <div className="grid grid-cols-1 gap-12">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                   <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                      <Video size={20} className="text-orange-500" /> Pengaturan Video Workshop
                   </h3>
                   
                   <div className="space-y-4">
                       <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">Upload Video File (.mp4)</label>
                           <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer group bg-white">
                               <input 
                                   type="file" 
                                   accept="video/mp4"
                                   onChange={handleVideoUpload}
                                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                               />
                               <div className="flex flex-col items-center gap-2">
                                   <div className="p-3 bg-orange-100 text-orange-600 rounded-full group-hover:scale-110 transition-transform">
                                       <Upload size={24} />
                                   </div>
                                   <p className="text-sm font-medium text-slate-600">
                                       Klik untuk upload atau seret file MP4 ke sini
                                   </p>
                                   <p className="text-xs text-slate-400">Maksimal ukuran file menyesuaikan memori browser</p>
                               </div>
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">Atau gunakan URL (Embed/Link)</label>
                           <div className="flex gap-4">
                              <div className="relative flex-1">
                                  <input 
                                     className="w-full border rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-600" 
                                     placeholder="Paste URL Video .mp4 atau Link Embed YouTube..."
                                     value={settingsForm.workshopVideoUrl || ''}
                                     onChange={(e) => setSettingsForm({...settingsForm, workshopVideoUrl: e.target.value})}
                                  />
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Link size={18} />
                                  </div>
                              </div>
                              <button onClick={handleSettingsSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-all">
                                 Simpan
                              </button>
                           </div>
                       </div>

                       <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
                           <div className="bg-white p-2 rounded-full h-fit text-blue-500 shadow-sm">
                               <FileVideo size={20} />
                           </div>
                           <div>
                               <h4 className="font-bold text-blue-800 text-sm">Preview Video Aktif:</h4>
                               {settingsForm.workshopVideoUrl ? (
                                   <div className="mt-2 rounded-lg overflow-hidden border border-blue-200 shadow-sm max-w-md bg-black aspect-video relative">
                                      {settingsForm.workshopVideoUrl.endsWith('.mp4') || settingsForm.workshopVideoUrl.startsWith('blob:') ? (
                                          <video src={settingsForm.workshopVideoUrl} controls className="w-full h-full object-cover" />
                                      ) : (
                                          <div className="w-full h-full flex items-center justify-center text-white text-xs">
                                              Preview Link Eksternal
                                          </div>
                                      )}
                                   </div>
                               ) : (
                                   <p className="text-sm text-blue-600 mt-1 italic">Belum ada video dipilih.</p>
                               )}
                           </div>
                       </div>
                   </div>
                </div>

                <div>
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                         <ImageIcon size={20} className="text-orange-500" /> Galeri Pengerjaan (Marquee)
                      </h3>
                      <button onClick={() => handleAdd('gallery')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm">
                         <Plus size={16} /> Tambah Foto
                      </button>
                   </div>
                   
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {galleryItems.map(item => (
                         <div key={item.id} className="group relative rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-video">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                               <p className="text-white text-xs font-bold mb-2">{item.title}</p>
                               <div className="flex gap-2">
                                  <button onClick={() => handleEdit(item, 'gallery')} className="bg-white p-1.5 rounded text-blue-600 hover:bg-blue-50"><Edit size={14}/></button>
                                  <button onClick={() => handleDelete(item.id, 'gallery')} className="bg-white p-1.5 rounded text-red-600 hover:bg-red-50"><Trash2 size={14}/></button>
                               </div>
                            </div>
                         </div>
                      ))}
                      {galleryItems.length === 0 && (
                         <div className="col-span-full text-center p-8 border-2 border-dashed border-slate-300 rounded-lg text-slate-400">
                            Belum ada foto galeri.
                         </div>
                      )}
                   </div>
                </div>
             </div>
           </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 capitalize">
                        {activeTab === 'design_services' ? 'Paket Desain Profesional' : `Kelola ${activeTab}`}
                    </h2>
                    <p className="text-sm text-slate-500">Total {
                        activeTab === 'projects' ? projects.length : 
                        activeTab === 'testimonials' ? testimonials.length : 
                        activeTab === 'products' ? products.length :
                        activeTab === 'services' ? services.length :
                        activeTab === 'design_services' ? designServices.length :
                        heroSlides.length
                    } item</p>
                </div>
                <button onClick={() => handleAdd()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-blue-200 transition-transform active:scale-95">
                    <Plus size={18} /> Tambah Baru
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            {activeTab !== 'products' && activeTab !== 'services' && activeTab !== 'design_services' && <th className="px-6 py-4">Gambar</th>}
                            <th className="px-6 py-4">Judul / Nama</th>
                            <th className="px-6 py-4">Detail</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {activeTab === 'projects' && projects.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-400">#{item.id}</td>
                                <td className="px-6 py-4">
                                    <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded shadow-sm border border-slate-200" />
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold uppercase mr-2">{item.category}</span>
                                    {item.description.substring(0, 30)}...
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(item.id, 'project')} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {activeTab === 'testimonials' && testimonials.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-400">#{item.id}</td>
                                <td className="px-6 py-4">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-full shadow-sm border border-slate-200" />
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    <div className="font-semibold text-orange-500">{item.business}</div>
                                    "{item.content.substring(0, 40)}..."
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(item.id, 'testimonial')} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {activeTab === 'products' && products.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-400">#{item.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    <span className="block text-xs uppercase font-bold text-slate-400">{item.type}</span>
                                    <span className="flex items-center gap-2 mt-1 text-slate-700">
                                        {getIconComponent(item.iconName, { size: 16, className: 'text-orange-500' })} 
                                        {item.iconName}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(item.id, 'product')} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {activeTab === 'services' && services.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-400">#{item.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <span className={`flex items-center justify-center w-6 h-6 rounded text-white text-[10px] ${item.color}`}>
                                             {getIconComponent(item.iconName, { size: 14 })}
                                        </span>
                                        {item.description.substring(0, 50)}...
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(item.id, 'service')} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {activeTab === 'hero' && heroSlides.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-400">#{item.id}</td>
                                <td className="px-6 py-4">
                                    <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded shadow-sm border border-slate-200" />
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {item.subtitle.substring(0, 50)}...
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(item.id, 'hero')} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {activeTab === 'design_services' && designServices.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-400">#{item.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-700">Rp {item.price} {item.unit}</span>
                                        <span className="text-xs">{item.features.length} fitur • Tema: {item.colorTheme}</span>
                                        {item.popular && <span className="text-xs text-orange-500 font-bold">★ Popular</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item, 'design_services')} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(item.id, 'design_service')} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                {((activeTab === 'projects' && projects.length === 0) || 
                  (activeTab === 'testimonials' && testimonials.length === 0) ||
                  (activeTab === 'products' && products.length === 0) ||
                  (activeTab === 'services' && services.length === 0) ||
                  (activeTab === 'hero' && heroSlides.length === 0) ||
                  (activeTab === 'design_services' && designServices.length === 0)) && (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                        <div className="bg-slate-100 p-4 rounded-full mb-3">
                            <Plus className="text-slate-300" size={32} />
                        </div>
                        <p>Belum ada data di kategori ini.</p>
                        <button onClick={() => handleAdd()} className="text-blue-600 font-medium hover:underline mt-2">Tambah data pertama</button>
                    </div>
                )}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <EditModal 
            activeTab={modalType as any} 
            editingItem={editingItem} 
            onClose={() => setIsModalOpen(false)} 
            onSave={handleSave} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;