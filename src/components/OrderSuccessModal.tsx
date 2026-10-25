import React from 'react';
import { Order } from '../types';
import { CheckCircle2, Truck, ArrowRight, Package, Clock, MapPin } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onGoToTracker: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onGoToTracker,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="glass-panel rounded-3xl max-w-md w-full p-6 sm:p-8 border border-sky-100 bg-white shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            สั่งซื้อสำเร็จเรียบร้อย
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">
            ขอบคุณที่ไว้วางใจ AquaPure
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            หมายเลขคำสั่งซื้อของคุณคือ <strong className="text-sky-700 font-mono">#{order.id}</strong>
          </p>
        </div>

        {/* Order Details Brief Box */}
        <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-100 text-left space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-sky-200/60 font-semibold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>รอบจัดส่งที่เลือก</span>
            </span>
            <span className="text-sky-700">{order.deliveryTimeSlot}</span>
          </div>

          <div className="flex items-start gap-1.5 text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="leading-tight">
              {order.address.addressLine} แขวง{order.address.subDistrict} เขต{order.address.district}
            </span>
          </div>

          <div className="pt-2 border-t border-sky-200/60 flex items-center justify-between">
            <span className="text-slate-500">ยอดชำระสุทธิ:</span>
            <span className="text-base font-bold text-[#006194] tabular-nums">฿{order.totalAmount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onGoToTracker}
            className="w-full glow-btn-primary py-3 rounded-full text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Truck className="w-4 h-4" />
            <span>ติดตามตำแหน่งไรเดอร์แบบสด</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer transition-colors"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>

      </div>
    </div>
  );
};
