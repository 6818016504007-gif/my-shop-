import React, { useState } from 'react';
import { Calculator, Users, Building2, Home, ArrowRight, CheckCircle2, TrendingDown, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/waterProducts';
import { Product, DeliveryFrequency } from '../types';

interface WaterCalculatorProps {
  onApplyPlan: (product: Product, quantity: number, frequency: DeliveryFrequency) => void;
}

export const WaterCalculator: React.FC<WaterCalculatorProps> = ({ onApplyPlan }) => {
  const [placeType, setPlaceType] = useState<'home' | 'office'>('home');
  const [peopleCount, setPeopleCount] = useState<number>(3);
  const [cookingUsage, setCookingUsage] = useState<boolean>(true); // ใช้น้ำประกอบอาหาร/ชงกาแฟด้วย

  // Calculations:
  // Avg person drinks ~ 2.0L per day. If cookingUsage: +0.5L per person per day.
  // 30 days per month.
  const litersPerPersonPerDay = (placeType === 'office' ? 1.5 : 2.0) + (cookingUsage ? 0.5 : 0);
  const daysInMonth = placeType === 'office' ? 22 : 30; // 22 work days vs 30 home days
  const totalLitersPerMonth = Math.round(peopleCount * litersPerPersonPerDay * daysInMonth);

  // 1 Gallon = 18.9L
  const recommendedGallonsPerMonth = Math.ceil(totalLitersPerMonth / 18.9);
  
  // Recommended delivery cadence
  let recommendedFreq: DeliveryFrequency = 'monthly';
  let bottlesPerTrip = recommendedGallonsPerMonth;

  if (recommendedGallonsPerMonth >= 8) {
    recommendedFreq = 'weekly';
    bottlesPerTrip = Math.ceil(recommendedGallonsPerMonth / 4);
  } else if (recommendedGallonsPerMonth >= 4) {
    recommendedFreq = 'biweekly';
    bottlesPerTrip = Math.ceil(recommendedGallonsPerMonth / 2);
  } else {
    recommendedFreq = 'monthly';
    bottlesPerTrip = recommendedGallonsPerMonth;
  }

  // Cost comparison:
  // Retail bottle 600ml @ 7 THB => ~11.6 THB / Litre
  const retailCostEstimate = Math.round(totalLitersPerMonth * 11.6);
  // AquaPure subscription gallon (65 THB / 18.9L = ~3.44 THB / Litre)
  const aquaPureCost = recommendedGallonsPerMonth * 65;
  const moneySaved = Math.max(0, retailCostEstimate - aquaPureCost);
  const percentSaved = Math.round((moneySaved / (retailCostEstimate || 1)) * 100);

  const gallonProduct = PRODUCTS.find(p => p.id === 'gallon-18-9l') || PRODUCTS[0];

  const handleApply = () => {
    onApplyPlan(gallonProduct, bottlesPerTrip, recommendedFreq);
  };

  return (
    <section id="calculator" className="py-12 lg:py-20 bg-gradient-to-b from-white via-sky-50/40 to-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#006194] text-xs font-semibold">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>ระบบคำนวณปริมาณน้ำดื่มอัจฉริยะ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b1c30]">
            คำนวณปริมาณน้ำดื่มที่เหมาะสมกับบ้านหรือที่ทำงาน
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            หมดปัญหาน้ำดื่มหมดกะทันหัน หรือสั่งมาเยอะเกินจนไม่มีที่วาง พร้อมดูยอดประหยัดค่าใช้จ่ายทันที
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Controls Form (6 cols) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 border border-sky-100 space-y-6">
            <h3 className="font-bold text-lg text-slate-900 pb-3 border-b border-sky-100">
              ข้อมูลสถานที่และจำนวนผู้บริโภค
            </h3>

            {/* Place Type Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">ประเภทสถานที่</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlaceType('home')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    placeType === 'home'
                      ? 'bg-gradient-to-r from-[#006194] to-[#0284C7] text-white border-transparent shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>บ้าน / คอนโดที่พัก</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlaceType('office')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    placeType === 'office'
                      ? 'bg-gradient-to-r from-[#006194] to-[#0284C7] text-white border-transparent shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>สำนักงาน / ออฟฟิศ</span>
                </button>
              </div>
            </div>

            {/* People Count Slider / Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>{placeType === 'home' ? 'จำนวนสมาชิกในบ้าน' : 'จำนวนพนักงาน'}:</span>
                </label>
                <span className="font-bold text-sky-800 text-lg tabular-nums">
                  {peopleCount} คน
                </span>
              </div>

              <input
                type="range"
                min="1"
                max={placeType === 'home' ? 12 : 60}
                value={peopleCount}
                onChange={e => setPeopleCount(parseInt(e.target.value))}
                className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-[#006194]"
              />

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>1 คน</span>
                <span>{placeType === 'home' ? '6 คน' : '30 คน'}</span>
                <span>{placeType === 'home' ? '12+ คน' : '60+ คน'}</span>
              </div>
            </div>

            {/* Cooking / Coffee usage toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cookingUsage}
                  onChange={e => setCookingUsage(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">
                    ใช้น้ำสำหรับทำอาหาร ต้มซุป หรือชงกาแฟ/ชา
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    เพิ่มการเผื่อน้ำสะอาด 0.5 ลิตร/คน/วัน เพื่อสุขอนามัยที่ดี
                  </span>
                </div>
              </label>
            </div>

          </div>

          {/* Results Summary Card (6 cols) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 border border-sky-200 bg-gradient-to-br from-white to-sky-50/80 shadow-lg space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-sky-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                ข้อเสนอแนะที่เหมาะสมที่สุด
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Sparkles className="w-3 h-3" />
                <span>ประหยัดได้ {percentSaved}%</span>
              </span>
            </div>

            {/* Consumption metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white border border-sky-100">
                <span className="text-xs text-slate-500 block">ปริมาณน้ำที่ใช้ต่อเดือน</span>
                <span className="text-2xl font-bold text-[#006194] tabular-nums">
                  ~{totalLitersPerMonth}
                </span>
                <span className="text-xs text-slate-600 ml-1">ลิตร</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-sky-100">
                <span className="text-xs text-slate-500 block">เทียบเท่าถัง 18.9 ลิตร</span>
                <span className="text-2xl font-bold text-[#006194] tabular-nums">
                  {recommendedGallonsPerMonth}
                </span>
                <span className="text-xs text-slate-600 ml-1">ถัง / เดือน</span>
              </div>
            </div>

            {/* Recommended Subscription Plan */}
            <div className="p-4 rounded-xl bg-[#006194] text-white space-y-2">
              <div className="text-xs text-sky-200 font-medium">รอบการจัดส่งที่แนะนำ:</div>
              <div className="flex items-baseline justify-between">
                <h4 className="text-lg font-bold">
                  ส่งรอบละ {bottlesPerTrip} ถัง ({recommendedFreq === 'weekly' ? 'ทุกสัปดาห์' : recommendedFreq === 'biweekly' ? 'ทุก 2 สัปดาห์' : 'เดือนละครั้ง'})
                </h4>
                <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">
                  ฿{bottlesPerTrip * 65}/รอบ
                </span>
              </div>
              <p className="text-xs text-sky-100">
                ไรเดอร์จะเข้ามาส่งและรับถังเปล่าตามรอบ ไม่ต้องกักตุนหรือเปลืองพื้นที่จัดเก็บ
              </p>
            </div>

            {/* Money Saved Comparison */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block">ประหยัดเงินได้ประมาณ ฿{moneySaved.toLocaleString()} / เดือน</span>
                  <span className="text-[11px] text-emerald-700">เมื่อเทียบกับการซื้อน้ำขวดทั่วไปตามร้านค้า</span>
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <button
              type="button"
              onClick={handleApply}
              className="w-full glow-btn-primary py-3.5 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>สั่งซื้อแพ็กเกจนี้ทันที ({bottlesPerTrip} ถัง ฿{bottlesPerTrip * 65})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
