export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'chicken' | 'sides' | 'drinks' | 'sauces';
  imageUrl?: string;
  tags?: string[];
  options?: MenuOption[];
}

export interface MenuOption {
  id: string;
  name: string;
  priceModifier: number; // For example: -8 for half chicken if base is 18.50
  description?: string;
}

export interface CartItem extends MenuItem {
  cartItemId: string;
  quantity: number;
  selectedOption?: MenuOption;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  timestamp: string;
  status: OrderStatus;
}
