import React from 'react';
import { ShoppingBag, Droplets, PhoneCall } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-sky-100 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element, 1 line) */}
        <div 
          onClick={() => onNavigate('hero')}
          className="cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#006194] to-[#0EA5E9] flex items-center justify-center text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#0b1c30] flex items-center gap-1.5">
              AquaPure
              <span className="text-xs font-normal text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">
                อควาเพียว
              </span>
            </span>
          </div>
        </div>

        {/* Zone 2: 4-5 Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('products')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-sky-600 py-1 cursor-pointer ${
              activeSection === 'products' ? 'text-sky-600 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            สินค้าและแพ็กเกจ
          </button>
          <button
            onClick={() => onNavigate('subscriptions')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-sky-600 py-1 cursor-pointer ${
              activeSection === 'subscriptions' ? 'text-sky-600 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            สมัครสมาชิกรายรอบ
          </button>
          <button
            onClick={() => onNavigate('tracker')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-sky-600 py-1 cursor-pointer ${
              activeSection === 'tracker' ? 'text-sky-600 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            ติดตามการจัดส่ง
          </button>
          <button
            onClick={() => onNavigate('purity')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-sky-600 py-1 cursor-pointer ${
              activeSection === 'purity' ? 'text-sky-600 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            ผลตรวจคุณภาพน้ำ
          </button>
          <button
            onClick={() => onNavigate('calculator')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-sky-600 py-1 cursor-pointer ${
              activeSection === 'calculator' ? 'text-sky-600 font-semibold border-b-2 border-sky-600' : ''
            }`}
          >
            คำนวณปริมาณน้ำ
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:021234567"
            className="hidden lg:flex items-center gap-2 text-xs text-slate-500 hover:text-sky-700 px-3 py-2 rounded-lg bg-slate-50 transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
            <span>สายด่วน 02-123-4567</span>
          </a>

          <button
            onClick={onOpenCart}
            aria-label="เปิดตะกร้าสินค้า"
            className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#006194] to-[#0EA5E9] text-white text-sm font-semibold shadow-md shadow-sky-600/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">ตะกร้าสินค้า</span>
            {cartCount > 0 && (
              <span className="bg-white text-sky-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
