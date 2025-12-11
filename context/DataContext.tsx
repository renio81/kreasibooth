
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Testimonial, ServiceItem, ProductItem, HeroSlide, GeneralSettings, PricingItem, GalleryItem, DesignServiceItem } from '../types';

// Default Data (used if localStorage is empty)
const defaultProjects: Project[] = [
  { id: 1, title: "Kopi Kenangan Senja", category: "food", image: "https://picsum.photos/id/425/600/400", description: "Booth Container Minimalis" },
  { id: 2, title: "Martabak Sultan", category: "food", image: "https://picsum.photos/id/429/600/400", description: "Gerobak Kayu Klasik" },
  { id: 3, title: "Laundry Kilat", category: "service", image: "https://picsum.photos/id/20/600/400", description: "Counter Meja Resepsionis" },
  { id: 4, title: "Fashion Pop-up", category: "pameran", image: "https://picsum.photos/id/175/600/400", description: "Booth Pameran Mall" },
  { id: 5, title: "Thai Tea Buble", category: "food", image: "https://picsum.photos/id/292/600/400", description: "Gerobak Sepeda Motor" },
  { id: 6, title: "Gadget Store", category: "retail", image: "https://picsum.photos/id/3/600/400", description: "Etalase Aluminium Kaca" },
];

const defaultTestimonials: Testimonial[] = [
  { id: 1, name: "Budi Santoso", business: "Kebab Turki Mas Budi", content: "Pengerjaan sangat rapi dan tepat waktu. Mantap!", rating: 5, image: "https://picsum.photos/id/1005/100/100" },
  { id: 2, name: "Siti Aminah", business: "Es Teh Solo", content: "Desain dibantu sampai nemu yang pas. Recommended.", rating: 5, image: "https://picsum.photos/id/1011/100/100" },
  { id: 3, name: "Hendro Wijaya", business: "Barbershop Classic", content: "Furniture barbershop presisi dan kokoh.", rating: 4, image: "https://picsum.photos/id/1027/100/100" },
];

const defaultServices: ServiceItem[] = [
  { id: 1, title: "Desain & Perencanaan 3D", description: "Konsultasi konsep dan visualisasi 3D realistis.", iconName: "PenTool", color: "bg-blue-500" },
  { id: 2, title: "Manufaktur & Fabrikasi", description: "Konstruksi besi, kayu, dan finishing cat duco.", iconName: "Hammer", color: "bg-orange-500" },
  { id: 3, title: "Instalasi Listrik", description: "Pemasangan kabel, lampu LED, dan neon box.", iconName: "Zap", color: "bg-yellow-500" },
  { id: 4, title: "Branding Visual", description: "Stiker vinyl, cutting sticker, dan logo timbul.", iconName: "Palette", color: "bg-pink-500" },
  { id: 5, title: "Pengiriman", description: "Layanan antar aman dan instalasi di lokasi.", iconName: "Truck", color: "bg-green-500" },
];

const defaultProducts: ProductItem[] = [
  { id: 1, name: "Booth Container", iconName: "Store", type: "Outdoor" },
  { id: 2, name: "Gerobak Kayu", iconName: "Coffee", type: "Classic" },
  { id: 3, name: "Gerobak Besi", iconName: "Settings", type: "Modern" },
  { id: 4, name: "Booth Semi-Permanen", iconName: "Store", type: "Kios" },
  { id: 5, name: "Gerobak Motor", iconName: "Truck", type: "Mobile" },
  { id: 6, name: "Portable Booth", iconName: "ShoppingBag", type: "Knockdown" },
  { id: 7, name: "Interior Cafe", iconName: "Coffee", type: "Furniture" },
  { id: 8, name: "Gerobak Alumunium", iconName: "Settings", type: "Ekonomis" },
];

const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "https://picsum.photos/id/431/1920/1080",
    title: "Wujudkan Bisnis Impianmu",
    subtitle: "Desain booth dan gerobak kreatif yang menarik pelanggan sejak pandangan pertama."
  },
  {
    id: 2,
    image: "https://picsum.photos/id/225/1920/1080",
    title: "Material Berkualitas Tinggi",
    subtitle: "Kami menggunakan kayu, besi, dan aluminium terbaik untuk ketahanan jangka panjang."
  },
  {
    id: 3,
    image: "https://picsum.photos/id/445/1920/1080",
    title: "Siap Kirim Seluruh Indonesia",
    subtitle: "Layanan pengiriman aman dan terpercaya sampai ke lokasi usaha Anda."
  }
];

const defaultPricingItems: PricingItem[] = [
  { id: 1, name: 'Kayu Jati Belanda', type: 'material', price: 1500000, unit: 'm' },
  { id: 2, name: 'Besi Hollow + Galvalum', type: 'material', price: 1800000, unit: 'm' },
  { id: 3, name: 'Aluminium Kaca', type: 'material', price: 1200000, unit: 'm' },
  { id: 4, name: 'Modifikasi Container', type: 'material', price: 2500000, unit: 'm' },
  { id: 5, name: 'Atap / Kanopi', type: 'addon', price: 500000, unit: 'unit' },
  { id: 6, name: 'Roda Gerobak', type: 'addon', price: 300000, unit: 'unit' },
  { id: 7, name: 'Neon Box Branding', type: 'addon', price: 850000, unit: 'unit' },
];

const defaultGalleryItems: GalleryItem[] = [
    { id: 1, title: 'Proses Las', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 2, title: 'Finishing Kayu', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 3, title: 'Instalasi Listrik', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 4, title: 'Pengecatan', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 5, title: 'Assembly', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&q=80&w=300&h=200' }
];

const defaultDesignServices: DesignServiceItem[] = [
  {
    id: 1,
    title: "Gerobak Standard",
    price: "350.000",
    unit: "/ booth",
    description: "Cocok untuk UMKM pemula, booth portable, atau gerobak pinggir jalan.",
    features: ["Desain 3D Realistis", "2x Revisi Minor", "Format JPG/PNG High Res", "Tampilan Eye-catching"],
    iconName: "Monitor",
    colorTheme: "blue",
    popular: false
  },
  {
    id: 2,
    title: "Booth Pameran",
    price: "600.000",
    unit: "/ desain",
    note: "*Tergantung luas area",
    description: "Untuk event, bazaar mall, atau pameran dagang yang butuh impact visual kuat.",
    features: ["Desain Tematik", "Layouting Area", "Detail Branding", "File Siap Produksi"],
    iconName: "Layout",
    colorTheme: "orange",
    popular: true
  },
  {
    id: 3,
    title: "Cafe & Resto",
    price: "1.000.000",
    unit: "/ view",
    description: "Perancangan interior lengkap untuk coffee shop, bistro, atau restoran permanen.",
    features: ["Konsep Interior Full", "Layout Furniture", "Detail Pencahayaan", "Material Board"],
    iconName: "PenTool",
    colorTheme: "purple",
    popular: false
  }
];

const defaultGeneralSettings: GeneralSettings = {
  aboutTitle: "Mitra Terpercaya Membangun Branding Usaha Anda",
  aboutDescription: "KreasiBooth berdiri sejak 2015, berawal dari bengkel las kecil kini menjadi spesialis manufaktur booth dan gerobak modern. Kami memadukan seni desain dengan ketahanan konstruksi untuk menciptakan tempat usaha yang tidak hanya fungsional, tapi juga 'Instagrammable'.",
  aboutImage: "https://picsum.photos/id/1/800/600",
  whatsapp: "6281316426495",
  address: "Jakarta Selatan",
  instagram: "@kreasibooth",
  email: "admin@kreasibooth.com",
  workshopVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-in-a-carpentry-workshop-40502-large.mp4"
};

interface DataContextType {
  projects: Project[];
  testimonials: Testimonial[];
  services: ServiceItem[];
  products: ProductItem[];
  heroSlides: HeroSlide[];
  generalSettings: GeneralSettings;
  pricingItems: PricingItem[];
  galleryItems: GalleryItem[];
  designServices: DesignServiceItem[];

  updateProject: (item: Project) => void;
  addProject: (item: Project) => void;
  deleteProject: (id: number) => void;

  updateTestimonial: (item: Testimonial) => void;
  addTestimonial: (item: Testimonial) => void;
  deleteTestimonial: (id: number) => void;

  updateProduct: (item: ProductItem) => void;
  addProduct: (item: ProductItem) => void;
  deleteProduct: (id: number) => void;

  updateService: (item: ServiceItem) => void;
  addService: (item: ServiceItem) => void;
  deleteService: (id: number) => void;

  updateHeroSlide: (item: HeroSlide) => void;
  addHeroSlide: (item: HeroSlide) => void;
  deleteHeroSlide: (id: number) => void;

  updateGeneralSettings: (settings: GeneralSettings) => void;

  addPricingItem: (item: PricingItem) => void;
  updatePricingItem: (item: PricingItem) => void;
  deletePricingItem: (id: number) => void;

  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: number) => void;

  addDesignService: (item: DesignServiceItem) => void;
  updateDesignService: (item: DesignServiceItem) => void;
  deleteDesignService: (id: number) => void;

  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [designServices, setDesignServices] = useState<DesignServiceItem[]>([]);
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(defaultGeneralSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage
    const loadData = () => {
      const storedProjects = localStorage.getItem('kb_projects');
      const storedTestimonials = localStorage.getItem('kb_testimonials');
      const storedServices = localStorage.getItem('kb_services');
      const storedProducts = localStorage.getItem('kb_products');
      const storedHero = localStorage.getItem('kb_hero');
      const storedPricing = localStorage.getItem('kb_pricing');
      const storedGallery = localStorage.getItem('kb_gallery');
      const storedDesignServices = localStorage.getItem('kb_design_services');
      const storedSettings = localStorage.getItem('kb_settings');

      setProjects(storedProjects ? JSON.parse(storedProjects) : defaultProjects);
      setTestimonials(storedTestimonials ? JSON.parse(storedTestimonials) : defaultTestimonials);
      setServices(storedServices ? JSON.parse(storedServices) : defaultServices);
      setProducts(storedProducts ? JSON.parse(storedProducts) : defaultProducts);
      setHeroSlides(storedHero ? JSON.parse(storedHero) : defaultHeroSlides);
      setPricingItems(storedPricing ? JSON.parse(storedPricing) : defaultPricingItems);
      setGalleryItems(storedGallery ? JSON.parse(storedGallery) : defaultGalleryItems);
      setDesignServices(storedDesignServices ? JSON.parse(storedDesignServices) : defaultDesignServices);
      
      if (storedSettings) {
        setGeneralSettings({ ...defaultGeneralSettings, ...JSON.parse(storedSettings) });
      } else {
        setGeneralSettings(defaultGeneralSettings);
      }
      
      setIsLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kb_projects', JSON.stringify(projects));
      localStorage.setItem('kb_testimonials', JSON.stringify(testimonials));
      localStorage.setItem('kb_services', JSON.stringify(services));
      localStorage.setItem('kb_products', JSON.stringify(products));
      localStorage.setItem('kb_hero', JSON.stringify(heroSlides));
      localStorage.setItem('kb_pricing', JSON.stringify(pricingItems));
      localStorage.setItem('kb_gallery', JSON.stringify(galleryItems));
      localStorage.setItem('kb_design_services', JSON.stringify(designServices));
      localStorage.setItem('kb_settings', JSON.stringify(generalSettings));
    }
  }, [projects, testimonials, services, products, heroSlides, pricingItems, galleryItems, designServices, generalSettings, isLoaded]);

  // Projects CRUD
  const addProject = (item: Project) => setProjects(prev => [...prev, { ...item, id: Date.now() }]);
  const updateProject = (item: Project) => setProjects(prev => prev.map(p => p.id === item.id ? item : p));
  const deleteProject = (id: number) => setProjects(prev => prev.filter(p => p.id !== id));

  // Testimonials CRUD
  const addTestimonial = (item: Testimonial) => setTestimonials(prev => [...prev, { ...item, id: Date.now() }]);
  const updateTestimonial = (item: Testimonial) => setTestimonials(prev => prev.map(t => t.id === item.id ? item : t));
  const deleteTestimonial = (id: number) => setTestimonials(prev => prev.filter(t => t.id !== id));

  // Products CRUD
  const addProduct = (item: ProductItem) => setProducts(prev => [...prev, { ...item, id: Date.now() }]);
  const updateProduct = (item: ProductItem) => setProducts(prev => prev.map(p => p.id === item.id ? item : p));
  const deleteProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id));

  // Services CRUD
  const addService = (item: ServiceItem) => setServices(prev => [...prev, { ...item, id: Date.now() }]);
  const updateService = (item: ServiceItem) => setServices(prev => prev.map(s => s.id === item.id ? item : s));
  const deleteService = (id: number) => setServices(prev => prev.filter(s => s.id !== id));

  // Hero CRUD
  const addHeroSlide = (item: HeroSlide) => setHeroSlides(prev => [...prev, { ...item, id: Date.now() }]);
  const updateHeroSlide = (item: HeroSlide) => setHeroSlides(prev => prev.map(h => h.id === item.id ? item : h));
  const deleteHeroSlide = (id: number) => setHeroSlides(prev => prev.filter(h => h.id !== id));
  
  // Pricing CRUD
  const addPricingItem = (item: PricingItem) => setPricingItems(prev => [...prev, { ...item, id: Date.now() }]);
  const updatePricingItem = (item: PricingItem) => setPricingItems(prev => prev.map(p => p.id === item.id ? item : p));
  const deletePricingItem = (id: number) => setPricingItems(prev => prev.filter(p => p.id !== id));

  // Gallery CRUD
  const addGalleryItem = (item: GalleryItem) => setGalleryItems(prev => [...prev, { ...item, id: Date.now() }]);
  const updateGalleryItem = (item: GalleryItem) => setGalleryItems(prev => prev.map(g => g.id === item.id ? item : g));
  const deleteGalleryItem = (id: number) => setGalleryItems(prev => prev.filter(g => g.id !== id));

  // Design Services CRUD
  const addDesignService = (item: DesignServiceItem) => setDesignServices(prev => [...prev, { ...item, id: Date.now() }]);
  const updateDesignService = (item: DesignServiceItem) => setDesignServices(prev => prev.map(d => d.id === item.id ? item : d));
  const deleteDesignService = (id: number) => setDesignServices(prev => prev.filter(d => d.id !== id));

  // General Settings Update
  const updateGeneralSettings = (settings: GeneralSettings) => setGeneralSettings(settings);

  const resetData = () => {
    if(window.confirm('Apakah Anda yakin ingin mereset semua data ke pengaturan awal?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{
      projects, testimonials, services, products, heroSlides, generalSettings, pricingItems, galleryItems, designServices,
      addProject, updateProject, deleteProject,
      addTestimonial, updateTestimonial, deleteTestimonial,
      addProduct, updateProduct, deleteProduct,
      addService, updateService, deleteService,
      addHeroSlide, updateHeroSlide, deleteHeroSlide,
      updateGeneralSettings,
      addPricingItem, updatePricingItem, deletePricingItem,
      addGalleryItem, updateGalleryItem, deleteGalleryItem,
      addDesignService, updateDesignService, deleteDesignService,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
