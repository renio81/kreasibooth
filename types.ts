
export interface Project {
  id: number;
  title: string;
  category: 'food' | 'retail' | 'service' | 'cafe' | 'pameran';
  image: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  business: string;
  content: string;
  rating: number;
  image: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  iconName: string; // Changed from icon component to string name for storage
  color: string;
}

export interface ProductItem {
  id: number;
  name: string;
  type: string;
  iconName: string; // Changed from icon component to string name for storage
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface PricingItem {
  id: number;
  name: string;
  type: 'material' | 'addon';
  price: number;
  unit: string; // e.g., 'm' for meter lari, 'unit' for fixed item
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

export interface DesignServiceItem {
  id: number;
  title: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  note?: string;
  popular: boolean;
  iconName: string;
  colorTheme: 'blue' | 'orange' | 'purple' | 'green' | 'red';
}

export interface GeneralSettings {
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  whatsapp: string;
  address: string;
  instagram: string;
  email: string;
  workshopVideoUrl: string;
}

export interface PriceSimulationConfig {
  length: number;
  width: number;
  height: number;
  materialId: number;
  selectedAddons: number[];
}
