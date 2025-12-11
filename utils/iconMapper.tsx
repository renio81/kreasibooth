import React from 'react';
import { 
  PenTool, Truck, Palette, Settings, ShoppingBag, Coffee, 
  Store, Zap, Hammer, CheckCircle2, Building2, Users, Star,
  Box, Scissors, Monitor
} from 'lucide-react';

export const iconMap: { [key: string]: React.ElementType } = {
  PenTool, Truck, Palette, Settings, ShoppingBag, Coffee, 
  Store, Zap, Hammer, CheckCircle2, Building2, Users, Star,
  Box, Scissors, Monitor
};

export const getIconComponent = (iconName: string, props: any = {}) => {
  const Icon = iconMap[iconName] || Store;
  return <Icon {...props} />;
};

export const availableIcons = Object.keys(iconMap);