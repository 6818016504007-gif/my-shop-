export type DeliveryFrequency = 'once' | 'weekly' | 'biweekly' | 'monthly';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: 'gallon' | 'bottle' | 'dispenser' | 'accessory';
  volume: string;
  priceOneTime: number;
  priceSub: number; // subscription discount price
  image: string;
  badge?: string;
  description: string;
  specs: {
    packaging: string;
    shelfLife: string;
    depositFee?: number;
    suitableFor: string;
  };
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  frequency: DeliveryFrequency;
  hasEmptyGallonsToExchange?: boolean;
  emptyGallonsCount?: number;
}

export type OrderStep = 'placed' | 'sanitizing' | 'transit' | 'delivered';

export interface Order {
  id: string;
  createdAt: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    frequency: DeliveryFrequency;
  }[];
  totalAmount: number;
  status: OrderStep;
  deliveryDate: string;
  deliveryTimeSlot: string;
  address: {
    recipientName: string;
    phone: string;
    addressLine: string;
    subDistrict: string;
    district: string;
    province: string;
    postalCode: string;
    deliveryNote?: string;
  };
  paymentMethod: 'promptpay' | 'credit_card' | 'cod';
  driverInfo?: {
    name: string;
    phone: string;
    vehiclePlate: string;
    etaMinutes: number;
  };
}
