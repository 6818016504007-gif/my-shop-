import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_water_delivery_1792912286743.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'gallon-18-9l',
    name: 'น้ำดื่มบริสุทธิ์ ถัง 18.9 ลิตร (ฝาปิดมาตรฐาน)',
    nameEn: 'AquaPure 18.9L Standard Carboy',
    category: 'gallon',
    volume: '18.9 ลิตร',
    priceOneTime: 79,
    priceSub: 65,
    image: '/src/assets/images/water_gallon_18_9l_1792912287662.jpg',
    badge: 'สินค้ายอดนิยม',
    description: 'ถังโพลีคาร์บอเนตเกรดพรีเมียม Food Grade ปลอดสาร BPA กรองผ่าน RO + UV + Ozone สะอาดสดชื่น เหมาะสำหรับครอบครัวและสำนักงาน',
    specs: {
      packaging: 'ถังโพลีคาร์บอเนต Food Grade',
      shelfLife: '30 วันหลังเปิดใช้งาน',
      depositFee: 150, // มัดจำถัง (กรณีไม่มีถังแลก)
      suitableFor: 'สำหรับตู้กดน้ำ หรือแท่นวางถังน้ำทั่วไป',
    },
    inStock: true,
  },
  {
    id: 'pack-600ml',
    name: 'น้ำดื่มบรรจุขวด 600 มล. (แพ็ก 12 ขวด)',
    nameEn: 'AquaPure 600ml Bottled Water (Pack of 12)',
    category: 'bottle',
    volume: '600 มล. x 12 ขวด (7.2 ลิตร)',
    priceOneTime: 55,
    priceSub: 48,
    image: '/src/assets/images/water_bottles_pack_1792912288432.jpg',
    badge: 'ขนาดพกพาสะดวก',
    description: 'ขวดดีไซน์ทันสมัย จับถนัดมือ ฝาล็อกสองชั้น พกพาสะดวกสำหรับกิจกรรมกลางแจ้ง ห้องประชุม หรือดื่มระหว่างวัน',
    specs: {
      packaging: 'ขวด PET รีไซเคิลได้ 100%',
      shelfLife: '2 ปีนับจากวันผลิต',
      suitableFor: 'ดื่มประจำวัน การเดินทาง งานอีเวนต์ และห้องประชุม',
    },
    inStock: true,
  },
  {
    id: 'pack-1500ml',
    name: 'น้ำดื่มบรรจุขวด 1,500 มล. (แพ็ก 6 ขวด)',
    nameEn: 'AquaPure 1500ml Bottled Water (Pack of 6)',
    category: 'bottle',
    volume: '1.5 ลิตร x 6 ขวด (9.0 ลิตร)',
    priceOneTime: 59,
    priceSub: 52,
    image: '/src/assets/images/water_bottles_pack_1792912288432.jpg',
    badge: 'คุ้มค่าสำหรับบ้าน',
    description: 'ขนาดลิตรครึ่งสุดคุ้ม ปริมาณจุใจ เหมาะสำหรับแช่ตู้เย็นไว้ดื่มในครอบครัว หรือใช้ประกอบอาหารและชงเครื่องดื่ม',
    specs: {
      packaging: 'ขวด PET แข็งแรง ทนทาน',
      shelfLife: '2 ปีนับจากวันผลิต',
      suitableFor: 'ตู้เย็นในบ้าน ปรุงอาหาร ชงกาแฟ ชา',
    },
    inStock: true,
  },
  {
    id: 'dispenser-hot-cold',
    name: 'ตู้น้ำดื่มร้อน-เย็น ระบบคอมเพรสเซอร์ ทรงตั้งพื้น',
    nameEn: 'AquaPure Smart Hot & Cold Floor Dispenser',
    category: 'dispenser',
    volume: 'รองรับถัง 18.9 ลิตร',
    priceOneTime: 3890,
    priceSub: 390, // เช่าใช้รายเดือนรวมบริการล้างบำรุง
    image: '/src/assets/images/water_dispenser_1792912288433.jpg',
    badge: 'พร้อมระบบตัดไฟอัตโนมัติ',
    description: 'ตู้ทำน้ำร้อนและน้ำเย็นดีไซน์มินิมอล ระบบคอมเพรสเซอร์ประหยัดไฟเบอร์ 5 พร้อมระบบตัดอุณหภูมิปลอดภัยสำหรับเด็ก',
    specs: {
      packaging: 'เครื่องสแตนเลสสตีลพร้อมแผ่นเคลือบกันรอย',
      shelfLife: 'รับประกัน 3 ปีเต็ม',
      suitableFor: 'บ้าน สำนักงาน คลินิก ร้านค้า',
    },
    inStock: true,
  },
];

export const INITIAL_ACTIVE_ORDER: import('../types').Order = {
  id: 'AQP-882914',
  createdAt: 'วันนี้, 10:15 น.',
  items: [
    {
      productName: 'น้ำดื่มบริสุทธิ์ ถัง 18.9 ลิตร (ถังมาตรฐาน)',
      quantity: 4,
      price: 65,
      frequency: 'weekly',
    },
    {
      productName: 'น้ำดื่มบรรจุขวด 600 มล. (แพ็ก 12 ขวด)',
      quantity: 2,
      price: 48,
      frequency: 'weekly',
    },
  ],
  totalAmount: 356,
  status: 'transit',
  deliveryDate: 'วันนี้ (25 ต.ค. 2569)',
  deliveryTimeSlot: 'ช่วงสาย (10:30 - 11:30 น.)',
  address: {
    recipientName: 'คุณณัฐพล สุขสวัสดิ์',
    phone: '081-234-5678',
    addressLine: '99/42 ซอยสุขุมวิท 55 (ทองหล่อ)',
    subDistrict: 'คลองตันเหนือ',
    district: 'วัฒนา',
    province: 'กรุงเทพมหานคร',
    postalCode: '10110',
    deliveryNote: 'กรุณาวางถังน้ำไว้ข้างตู้รองเท้าหน้าบ้านได้เลยครับ',
  },
  paymentMethod: 'promptpay',
  driverInfo: {
    name: 'คุณสมชาย ยอดประสิทธิ์ (ไรเดอร์ทีม 04)',
    phone: '089-876-5432',
    vehiclePlate: '3ขพ 4892 กทม.',
    etaMinutes: 12,
  },
};
