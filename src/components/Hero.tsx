import React from 'react';
import { HERO_IMAGE } from '../data/waterProducts';
import { ShieldCheck, Truck, Sparkles, RefreshCw, ArrowRight, Award } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onTrackClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onTrackClick }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-sky-50/70 via-white to-[#f8f9ff]">
      {/* Decorative ambient water glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>มาตรฐานการผลิตระดับสากล ผ่านการรับรองจาก อย. และ GMP</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1c30] leading-tight" style={{ textWrap: 'balance' }}>
              น้ำดื่มบริสุทธิ์เกรดพรีเมียม <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006194] via-[#0284C7] to-[#0EA5E9]">
                ส่งตรงถึงหน้าประตูบ้านและสำนักงาน
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              มั่นใจในทุกหยดด้วยเทคโนโลยีการกรอง 7 ขั้นตอน (RO Membrane + UV Sterilization + Micro Ozone) สดชื่น ปลอดภัย ปราศจากสิ่งเจือปน พร้อมระบบส่งตามรอบอัตโนมัติ ไม่ต้องคอยยกหรือแบกเอง
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
              <button
                onClick={onOrderClick}
                className="glow-btn-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-base cursor-pointer shadow-lg shadow-sky-600/20"
              >
                <span>สั่งน้ำดื่มหรือสมัครสมาชิก</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onTrackClick}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-sky-200 text-sky-800 font-semibold text-base hover:bg-sky-50 transition-colors cursor-pointer shadow-xs"
              >
                <Truck className="w-5 h-5 text-sky-600" />
                <span>ติดตามสถานะจัดส่งสด</span>
              </button>
            </div>

            {/* Quick Benefits list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-sky-100/80 w-full text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
                <span>ค่า TDS บริสุทธิ์ต่ำกว่า 10 ppm</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-sky-500 shrink-0" />
                <span>เปลี่ยนถังเปล่าฟรี ลดมลพิษ</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>รับประกันความพึงพอใจ 100%</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Hero Image Card */}
              <div className="glass-panel rounded-3xl p-3 sm:p-4 shadow-xl border border-sky-200/60 overflow-hidden relative group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 relative">
                  <img
                    src={HERO_IMAGE}
                    alt="น้ำดื่มบริสุทธิ์ AquaPure ถัง 18.9 ลิตร"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/60 via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-sky-200 font-medium">เกรดพรีเมียม 18.9 ลิตร</p>
                      <p className="text-base font-bold">AquaPure Ultra-Clean</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-semibold backdrop-blur-xs">
                      สมาชิกเพียง 65.-/ถัง
                    </div>
                  </div>
                </div>

                {/* Floating Micro-Badge */}
                <div className="mt-3 p-3 rounded-xl bg-sky-50/80 border border-sky-100 flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-medium text-slate-800">รอบส่งด่วนวันนี้เปิดรับถึง 16:00 น.</span>
                  </div>
                  <span className="text-sky-700 font-semibold">จัดส่งใน 2 ชม.</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Proof & Quantitative Metrics Row */}
        <div className="mt-12 pt-8 border-t border-sky-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-[#006194] tabular-nums">120,000+</p>
            <p className="text-xs sm:text-sm text-slate-500">ถังน้ำดื่มจัดส่งสำเร็จทั่วประเทศ</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-[#006194] tabular-nums">99.98%</p>
            <p className="text-xs sm:text-sm text-slate-500">ความบริสุทธิ์ของน้ำ (RO 7 ขั้นตอน)</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-[#006194] tabular-nums">15 นาที</p>
            <p className="text-xs sm:text-sm text-slate-500">ระยะเวลาตอบสนองออเดอร์เฉลี่ย</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-[#006194] tabular-nums">4.9 / 5.0</p>
            <p className="text-xs sm:text-sm text-slate-500">ความพึงพอใจจากผู้ใช้กว่า 15,000 ครัวเรือน</p>
          </div>
        </div>

      </div>
    </section>
  );
};
