import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  CreditCard, 
  QrCode, 
  Coins, 
  ShieldCheck, 
  Clock,
  Sparkles
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'payment'>('cart');

  // Address State
  const [recipientName, setRecipientName] = useState('คุณณัฐพล สุขสวัสดิ์');
  const [phone, setPhone] = useState('081-234-5678');
  const [addressLine, setAddressLine] = useState('99/42 ซอยสุขุมวิท 55 (ทองหล่อ)');
  const [subDistrict, setSubDistrict] = useState('คลองตันเหนือ');
  const [district, setDistrict] = useState('วัฒนา');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [postalCode, setPostalCode] = useState('10110');
  const [deliveryNote, setDeliveryNote] = useState('วางถังน้ำไว้ข้างประตูรั้วหน้าบ้านได้เลยครับ');

  // Delivery slot
  const [deliveryDate, setDeliveryDate] = useState('วันนี้ (จัดส่งด่วน)');
  const [deliverySlot, setDeliverySlot] = useState('ช่วงสาย (10:30 - 11:30 น.)');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'credit_card' | 'cod'>('promptpay');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const isSub = item.frequency !== 'once';
    const unitPrice = isSub ? item.product.priceSub : item.product.priceOneTime;
    return sum + unitPrice * item.quantity;
  }, 0);

  // Gallon deposit calculation:
  // If product is gallon, and hasEmptyGallonsToExchange is false, add 150 THB deposit per gallon
  const depositTotal = cart.reduce((sum, item) => {
    if (item.product.category === 'gallon' && !item.hasEmptyGallonsToExchange) {
      return sum + (item.product.specs.depositFee || 150) * item.quantity;
    }
    return sum;
  }, 0);

  const discountAmount = appliedPromo ? 50 : 0;
  const shippingFee = 0; // Free delivery for AquaPure
  const grandTotal = Math.max(0, subtotal + depositTotal - discountAmount + shippingFee);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `AQP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: 'วันนี้, ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.',
      items: cart.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.frequency !== 'once' ? item.product.priceSub : item.product.priceOneTime,
        frequency: item.frequency,
      })),
      totalAmount: grandTotal,
      status: 'placed',
      deliveryDate: deliveryDate,
      deliveryTimeSlot: deliverySlot,
      address: {
        recipientName,
        phone,
        addressLine,
        subDistrict,
        district,
        province,
        postalCode,
        deliveryNote,
      },
      paymentMethod,
      driverInfo: {
        name: 'คุณสมชาย ยอดประสิทธิ์ (ไรเดอร์ทีม 04)',
        phone: '089-876-5432',
        vehiclePlate: '3ขพ 4892 กทม.',
        etaMinutes: 20,
      },
    };

    onPlaceOrder(newOrder);
    setCheckoutStep('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-sky-100 flex items-center justify-between bg-sky-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {checkoutStep === 'cart' ? 'ตะกร้าสินค้าของคุณ' : checkoutStep === 'details' ? 'ข้อมูลสถานที่จัดส่ง' : 'ชำระเงินและยืนยันออเดอร์'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {checkoutStep === 'cart' ? `ทั้งหมด ${cart.length} รายการ` : 'ขั้นตอนที่ ' + (checkoutStep === 'details' ? '2 จาก 3' : '3 จาก 3')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดตะกร้า"
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* STEP 1: CART LIST */}
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-400 mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-800">ยังไม่มีสินค้าในตะกร้า</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    เลือกสั่งน้ำดื่มถัง 18.9 ลิตร หรือน้ำดื่มขวดคุณภาพ เพื่อสุขภาพที่ดีของคุณและครอบครัว
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="glow-btn-primary px-6 py-2.5 rounded-full text-white text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    เลือกสินค้าทันที
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => {
                    const isSub = item.frequency !== 'once';
                    const unitPrice = isSub ? item.product.priceSub : item.product.priceOneTime;

                    return (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-2xl border border-sky-100 bg-sky-50/30 flex gap-3.5 items-center justify-between"
                      >
                        <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {item.product.name}
                          </h5>
                          
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-semibold text-[#006194] tabular-nums">
                              ฿{unitPrice}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              / {item.frequency === 'once' ? 'สั่งครั้งเดียว' : 'สมัครสมาชิก (' + (item.frequency === 'weekly' ? 'รายสัปดาห์' : item.frequency === 'biweekly' ? 'ทุก 2 สัปดาห์' : 'รายเดือน') + ')'}
                            </span>
                          </div>

                          {item.product.category === 'gallon' && (
                            <span className="text-[10px] text-emerald-700 block mt-0.5">
                              {item.hasEmptyGallonsToExchange ? '✓ มีถังเปล่ารอแลกคืน (ฟรีมัดจำ)' : '• ไม่มีถังแลก (+มัดจำ 150 บ./ถัง)'}
                            </span>
                          )}
                        </div>

                        {/* Stepper & Trash */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-900 w-5 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>ลบ</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Promo code input */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="โค้ดส่วนลด (ลองใส่: AQUA50)"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-sky-500 uppercase"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (promoCode.trim().toUpperCase() === 'AQUA50') {
                            setAppliedPromo(true);
                          } else {
                            alert('โค้ดส่วนลดไม่ถูกต้อง กรุณาลองใส่ AQUA50');
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-sky-100 text-[#006194] font-semibold text-xs hover:bg-sky-200 cursor-pointer transition-colors"
                      >
                        ใช้โค้ด
                      </button>
                    </div>

                    {appliedPromo && (
                      <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                        ✓ ใช้โค้ด AQUA50 สำเร็จ ลดทันที ฿50
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: ADDRESS & TIME DETAILS */}
          {checkoutStep === 'details' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">ชื่อผู้รับ</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">เบอร์โทรศัพท์ติดต่อ</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">ที่อยู่ / อาคาร / ซอย</label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={e => setAddressLine(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">แขวง / ตำบล</label>
                  <input
                    type="text"
                    value={subDistrict}
                    onChange={e => setSubDistrict(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">เขต / อำเภอ</label>
                  <input
                    type="text"
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">จังหวัด</label>
                  <input
                    type="text"
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">รหัสไปรษณีย์</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">ช่วงเวลาจัดส่งที่ต้องการ</label>
                <div className="grid grid-cols-3 gap-2">
                  {['ช่วงเช้า (09:00 - 12:00)', 'ช่วงบ่าย (13:00 - 17:00)', 'ช่วงเย็น (17:00 - 20:00)'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setDeliverySlot(s)}
                      className={`p-2 rounded-xl text-center border cursor-pointer ${
                        deliverySlot === s
                          ? 'bg-sky-600 text-white border-transparent font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[11px] block">{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">คำแนะนำหรือจุดวางน้ำดื่ม (ไม่บังคับ)</label>
                <textarea
                  rows={2}
                  value={deliveryNote}
                  onChange={e => setDeliveryNote(e.target.value)}
                  placeholder="เช่น ฝากไว้กับรปภ. หรือ วางหน้าประตูห้อง"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {checkoutStep === 'payment' && (
            <div className="space-y-4">
              <label className="font-bold text-xs text-slate-700 block">
                เลือกช่องทางการชำระเงิน
              </label>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'promptpay' as const,
                    title: 'พร้อมเพย์ QR Code (PromptPay)',
                    sub: 'สแกนจ่ายได้ทันทีผ่านทุกแอปธนาคาร ไม่มีค่าธรรมเนียม',
                    icon: QrCode,
                    badge: 'แนะนำ',
                  },
                  {
                    id: 'credit_card' as const,
                    title: 'บัตรเครดิต / บัตรเดบิต',
                    sub: 'Visa, Mastercard, JCB พร้อมระบบ 3D Secure',
                    icon: CreditCard,
                  },
                  {
                    id: 'cod' as const,
                    title: 'ชำระเงินสดปลายทาง (COD)',
                    sub: 'ชำระโดยตรงกับไรเดอร์เมื่อได้รับน้ำดื่ม',
                    icon: Coins,
                  },
                ].map(opt => {
                  const Icon = opt.icon;
                  const isSelected = paymentMethod === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-50/80 border-sky-400 ring-2 ring-sky-100'
                          : 'bg-white border-slate-200 hover:border-sky-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#006194] text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-slate-900">{opt.title}</span>
                            {opt.badge && (
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{opt.sub}</p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#006194] bg-[#006194]' : 'border-slate-300'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PromptPay QR Preview if selected */}
              {paymentMethod === 'promptpay' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <span className="text-xs font-semibold text-slate-700">ตัวอย่าง QR Code สำหรับชำระเงิน</span>
                  <div className="w-36 h-36 bg-white p-2 mx-auto rounded-xl border border-slate-300 flex items-center justify-center shadow-xs">
                    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-white rounded-lg p-2 text-center">
                      <QrCode className="w-12 h-12 text-white" />
                      <span className="text-[10px] font-mono mt-1 font-bold">PROMPTPAY</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    ยอดชำระ: <strong className="text-sky-800 text-sm">฿{grandTotal}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Pinned Order Summary & Next Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-sky-100 bg-white space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>ราคาสินค้ารวม:</span>
                <span className="tabular-nums">฿{subtotal}</span>
              </div>

              {depositTotal > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>ค่ามัดจำถังใหม่:</span>
                  <span className="tabular-nums">+฿{depositTotal}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600">
                  <span>ส่วนลดโปรโมชั่น:</span>
                  <span className="tabular-nums">-฿{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>ค่าจัดส่ง:</span>
                <span className="text-emerald-700 font-medium">ฟรี</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 font-bold text-slate-900">
                <span className="text-sm">ยอดรวมสุทธิ:</span>
                <span className="text-xl text-[#006194] tabular-nums">฿{grandTotal}</span>
              </div>
            </div>

            {/* Step navigation buttons */}
            <div className="flex gap-2">
              {checkoutStep !== 'cart' && (
                <button
                  type="button"
                  onClick={() => setCheckoutStep(checkoutStep === 'payment' ? 'details' : 'cart')}
                  className="px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                >
                  ย้อนกลับ
                </button>
              )}

              {checkoutStep === 'cart' && (
                <button
                  type="button"
                  onClick={() => setCheckoutStep('details')}
                  className="flex-1 glow-btn-primary py-3 rounded-full text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>ต่อไป: ระบุที่อยู่จัดส่ง</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {checkoutStep === 'details' && (
                <button
                  type="button"
                  onClick={() => setCheckoutStep('payment')}
                  className="flex-1 glow-btn-primary py-3 rounded-full text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>ต่อไป: เลือกวิธีชำระเงิน</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {checkoutStep === 'payment' && (
                <button
                  type="button"
                  onClick={handleCheckoutSubmit}
                  className="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>ยืนยันคำสั่งซื้อ (฿{grandTotal})</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
