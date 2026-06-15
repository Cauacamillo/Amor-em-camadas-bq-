export type ViewState =
  | 'login'
  | 'register'
  | 'catalog'
  | 'cart'
  | 'checkout'
  | 'payment'
  | 'order-tracking'
  | 'my-orders'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-orders'
  | 'admin-coupons'
  | 'admin-reports';

export type OrderStatus =
  | 'received'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'canceled';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  totalValue: number;
  paymentMethod: string;
  date: string;
  status: OrderStatus;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  expirationDate: string;
  maxUses: number;
  isActive: boolean;
}

export interface AppContextType {
  currentView: ViewState;
  navigate: (view: ViewState) => void;
  isStoreOpen: boolean;
  toggleStoreOpen: () => void;
  
  products: Product[];
  addProduct: (p: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;

  orders: Order[];
  addOrder: (o: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  removeOrder: (id: string) => void;

  coupons: Coupon[];
  addCoupon: (c: Omit<Coupon, 'id'>) => void;
  removeCoupon: (id: string) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
}
