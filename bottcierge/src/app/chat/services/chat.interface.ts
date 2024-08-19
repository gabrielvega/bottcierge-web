// interfaces.ts

export interface Message {
  text: string;
  type?: 'received' | 'sent';
  user: 'User' | 'Bot';
  created?: string;
  myIntent?: string;
  choices?: Array<any>;
  multiple?: boolean;
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

export interface OrderItem extends Choice {
  label: string;
  price: number;
  quantity: number;
  description: string;
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

export interface Choice {
  id: string;
  label: string;
  action:
    | '*SELECT_CATEGORY*'
    | '*SELECT_BRAND*'
    | '*SELECT_BOTTLE*'
    | '*ADD_ITEM*'
    | '*PLACE_ORDER*'
    | '*CLOSE_ORDER*'
    | '*SELECT_VIP_PACKAGE*'
    | '*ADD_ADDITIONAL_SERVICE*'
    | '*CALL_SERVICE*';
  icon: string;
  show: boolean;
  price?: number;
  description?: string;
  // Add any other common properties here
}

export interface MainMenu extends Choice {}

export interface MenuCategory extends Choice {
  spiritCategories: SpiritCategory[];
}

export interface SpiritCategory extends Choice {
  brands: Brand[];
}

export interface Brand extends Choice {
  bottles: Bottle[];
}

export interface Bottle extends Choice {
  // Any bottle-specific properties
}

export interface AdditionalItem extends Choice {
  // Any additional item specific properties
}
