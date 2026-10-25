import React, { useState } from 'react';
import { Product, DeliveryFrequency } from '../types';
import { PRODUCTS } from '../data/waterProducts';
import { Plus, Minus, Check, ShoppingBag, CalendarCheck, Sparkles, RefreshCcw, Info } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (
    product: Product,
    quantity: number,
    frequency: DeliveryFrequency,
    hasEmptyExchange: boolean,
    emptyCount: number
  ) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart }) => {
  // Frequency per product or global
  const [frequencies, setFrequencies] = useState<Record<string, DeliveryFrequency>>({
    'gallon-18-9l': 'weekly',
    'pack-600ml': 'biweekly',
    'pack-1500ml': 'monthly',
    'dispenser-hot-cold': 'monthly',
  });

  // Quantities per product
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'gallon-18-9l': 2,
    'pack-600ml': 1,
    'pack-1500ml': 1,
    'dispenser-hot-cold': 1,
  });

  // Empty gallons exchange state for 18.9L
  const [hasEmptyExchange, setHasEmptyExchange] = useState<boolean>(true);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const updated = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [productId]: updated };
    });
  };

  const handleFrequencyChange = (productId: string, freq: DeliveryFrequency) => {
    setFrequencies(prev => ({ ...prev, [productId]: freq }));
  };

  const handleAdd = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const freq = frequencies[product.id] || 'once';
    const isGallon = product.category === 'gallon';
    onAddToCart(product, qty, freq, isGallon ? hasEmptyExchange : false, isGallon && hasEmptyExchange ? qty : 0);

    setAddedNotice(product.id);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2000);
  };

  const frequencyOptions: { id: DeliveryFrequency; label: string; discountText: string }[] = [
    { id: 'once', label: 'สั่งครั้งเดียว', discountText: 'ราคาปกติ' },
    { id: 'weekly', label: 'ทุกสัปดาห์', discountText: 'ประหยัด 20%' },
    { id: 'biweekly', label: 'ทุก 2 สัปดาห์', discountText: 'ประหยัด 15%' },
    { id: 'monthly', label: 'รายเดือน', discountText: 'ประหยัด 10%' },
  ];

  return (
    <section id="products" className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 bg-sky-50 inline-block px-3 py-1 rounded-full border border-sky-100">
          รายการสินค้าและบริการ
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b1c30]">
          เลือกน้ำดื่มบริสุทธิ์และแผนจัดส่งที่เหมาะกับคุณ
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          สมัครรับน้ำดื่มต่อเนื่องรายสัปดาห์หรือรายเดือน รับส่วนลดพิเศษสูงสุด 20% พร้อมบริการยกส่งถึงชั้นและจุดวางน้ำดื่ม
        </p>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map(product => {
          const selectedFreq = frequencies[product.id] || 'once';
          const qty = quantities[product.id] || 1;
          const isSubscription = selectedFreq !== 'once';
          const currentUnitPrice = isSubscription ? product.priceSub : product.priceOneTime;
          const totalPrice = currentUnitPrice * qty;
          const isGallon = product.category === 'gallon';
          const isJustAdded = addedNotice === product.id;

          return (
            <div
              key={product.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between border border-sky-100/90 relative group"
            >
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 text-[11px] font-semibold text-sky-800 bg-white/95 rounded-md shadow-xs border border-sky-100/80">
                    {product.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white mb-4 p-2 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Name & Volume */}
                <div className="space-y-1 mb-3">
                  <span className="text-xs text-sky-600 font-medium">{product.volume}</span>
                  <h3 className="font-bold text-base text-[#0b1c30] line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="bg-sky-50/70 rounded-xl p-3 mb-4 border border-sky-100/80">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#006194] tabular-nums">
                        ฿{currentUnitPrice}
                      </span>
                      <span className="text-xs text-slate-500 ml-1">
                        /{product.category === 'dispenser' && isSubscription ? 'เดือน' : (product.category === 'gallon' ? 'ถัง' : 'แพ็ก')}
                      </span>
                    </div>

                    {isSubscription && (
                      <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ลดจาก ฿{product.priceOneTime}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1">
                    {isSubscription ? `รอบจัดส่ง: ${frequencyOptions.find(f => f.id === selectedFreq)?.label}` : 'ชำระรายครั้ง ไม่มีข้อผูกมัด'}
                  </p>
                </div>

                {/* Delivery Frequency Chips */}
                <div className="space-y-1.5 mb-4">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <CalendarCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>รอบการจัดส่ง</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {frequencyOptions.map(opt => {
                      const isSelected = selectedFreq === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleFrequencyChange(product.id, opt.id)}
                          className={`px-2 py-1.5 rounded-lg text-xs font-medium text-left transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#006194] to-[#0284C7] text-white border-transparent shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                          }`}
                        >
                          <div className="font-semibold truncate">{opt.label}</div>
                          <div className={`text-[10px] ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                            {opt.discountText}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Gallon Deposit Toggle */}
                {isGallon && (
                  <div className="mb-4 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/70 text-xs">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasEmptyExchange}
                        onChange={e => setHasEmptyExchange(e.target.checked)}
                        className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                      />
                      <div>
                        <span className="font-semibold text-emerald-900">มีถังเปล่ารอแลกคืน</span>
                        <p className="text-[11px] text-emerald-700">
                          {hasEmptyExchange
                            ? 'ฟรีค่ามัดจำถัง (ประหยัด 150 บ./ถัง)'
                            : 'คิดค่ามัดจำถังใหม่ 150 บ./ถัง (ขอคืนได้เมื่อเลิกใช้)'}
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Bottom Quantity Stepper & Add Button */}
              <div className="pt-2 border-t border-sky-100/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">จำนวน:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(product.id, -1)}
                      disabled={qty <= 1}
                      aria-label="ลดจำนวน"
                      className="w-8 h-8 rounded-full bg-[#E0F2FE] hover:bg-sky-200 text-[#006194] flex items-center justify-center font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-slate-800 w-6 text-center tabular-nums">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(product.id, 1)}
                      aria-label="เพิ่มจำนวน"
                      className="w-8 h-8 rounded-full bg-[#E0F2FE] hover:bg-sky-200 text-[#006194] flex items-center justify-center font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className={`w-full py-3 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isJustAdded
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'glow-btn-primary text-white'
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>เพิ่มลงตะกร้าแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>เพิ่มลงตะกร้า (฿{totalPrice})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Benefits Card */}
      <div id="subscriptions" className="mt-12 glass-panel rounded-2xl p-6 sm:p-8 border border-sky-200/80 bg-gradient-to-r from-sky-50/60 to-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">ปรับเปลี่ยนรอบส่งได้ตลอดเวลา</h4>
              <p className="text-xs text-slate-500 mt-1">
                ไปต่างจังหวัดหรือน้ำยังไม่หมด? สามารถกดเลื่อนวันส่ง (Skip delivery) หรือเพิ่มจำนวนถังได้ง่ายๆ ในคลิกเดียว
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">ประหยัดสูงสุด 20% ทุกรอบ</h4>
              <p className="text-xs text-slate-500 mt-1">
                สมาชิกรายสัปดาห์ได้รับราคาพิเศษทันที ฿65/ถัง พร้อมส่งฟรี ไม่มีขั้นต่ำ และไม่มีค่าธรรมเนียมแอบแฝง
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">บริการทำความสะอาดหัวจ่ายฟรี</h4>
              <p className="text-xs text-slate-500 mt-1">
                เจ้าหน้าที่ทำความสะอาดและฆ่าเชื้อจุดวางถังน้ำและหัวจ่ายน้ำดื่มทุกๆ 3 เดือน เพื่อสุขอนามัยสูงสุด
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
