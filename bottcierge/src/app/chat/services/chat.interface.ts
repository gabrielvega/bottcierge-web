// interfaces.ts

export interface Choice {
    label: string;
    action: string;
    value: string;
    icon: string;
    show: boolean;
  }
  
  export interface Message {
    text: string;
    type?: 'received' | 'sent';
    user: 'User' | 'Bot';
    created?: string;
    myIntent?: string;
    choices?: Array<any>;
    multiple?: boolean;
  }
  
  export interface Bottle {
    label: string;
    action: string;
    icon: string;
    price: number;
    show: boolean;
  }
  
  export interface Brand {
    label: string;
    icon: string;
    action: string;
    bottles: Bottle[];
    show: boolean;
  }
  
  export interface SpiritCategory {
    label: string;
    action: string;
    icon: string;
    brands: Brand[];
    price?: number;
    show: boolean;
  }
  
  export interface MenuCategory {
    id: string;
    label: string;
    action: string;
    background?: string;
    icon: string;
    spiritCategories: SpiritCategory[];
    show: boolean;
  }
  
  export interface VIPPackage {
    id: string;
    label: string;
    price: number;
    description: string;
    maxGuests: number;
    includedItems: string[];
    customizableItems: number;
  }
  
  export interface OrderItem {
    label: string;
    price: number;
    quantity: number;
  }
  
  export interface Order {
    items: OrderItem[];
    subtotal: number;
    gratuity: number;
    tax: number;
    total: number;
    table: number;
  }
  
  export interface AdditionalService {
    id: string;
    label: string;
    price: number;
    description: string;
  }