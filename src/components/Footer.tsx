import React from 'react';
import { Droplets, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0b1c30] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#006194] to-[#0EA5E9] flex items-center justify-center text-white">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AquaPure <span className="text-xs font-normal text-sky-400">อควาเพียว</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              ผู้ให้บริการจัดส่งน้ำดื่มบริสุทธิ์ถึงบ้านและสำนักงานอันดับ 1 ในไทย ด้วยเทคโนโลยีการกรอง 7 ขั้นตอนมาตรฐานสากล บริการรวดเร็ว ตรงเวลา สะอาดสดชื่นในทุกหยด
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>อย. 10-1-08962-5-0012</span>
              </div>
              <span>·</span>
              <span>ISO 22000 Certified</span>
              <span>·</span>
              <span>GMP & HACCP</span>
            </div>
          </div>

          {/* Nav Links Column 1: ผลิตภัณฑ์ */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              สินค้าและบริการ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  น้ำดื่มถัง 18.9 ลิตร
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  น้ำดื่มขวด 600 มล. (แพ็ก 12)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  น้ำดื่มขวด 1.5 ลิตร (แพ็ก 6)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  ตู้น้ำดื่มร้อน-เย็น สำหรับองค์กร
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: ระบบและฟีเจอร์ */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              บริการสมาชิก
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('subscriptions')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  สมัครสมาชิกรับน้ำรายรอบ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tracker')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  ติดตามการจัดส่งแบบสด
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  เครื่องคำนวณปริมาณน้ำดื่ม
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('purity')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  ผลตรวจวิเคราะห์จากแล็บ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              ศูนย์บริการลูกค้า
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>02-123-4567 (ทุกวัน 08:00 - 20:00)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>contact@aquapure-th.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[9px]">L</span>
                <span>Line Official: @aquapure_th</span>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>ศูนย์กระจายสินค้าสุขุมวิท กรุงเทพมหานคร 10110</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AquaPure Thailand. สงวนลิขสิทธิ์ทุกประการ</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">นโยบายความเป็นส่วนตัว</span>
            <span className="hover:text-slate-400 cursor-pointer">ข้อกำหนดและเงื่อนไขการบริการ</span>
            <span className="hover:text-slate-400 cursor-pointer">แผนผังเว็บไซต์</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
