
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
  iconName: string; 
  color: string;
}

export interface ProductItem {
  id: number;
  name: string;
  type: string;
  iconName: string; 
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
  unit: string; 
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

export type PaymentMethodType = 'qris' | 'bank_transfer' | 'ewallet';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  iconName: string;
  accountNumber?: string;
  accountName?: string;
}
