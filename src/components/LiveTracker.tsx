import React, { useState } from 'react';
import { Order, OrderStep } from '../types';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Package, 
  RotateCcw,
  Send,
  Navigation
} from 'lucide-react';

interface LiveTrackerProps {
  order: Order;
  onUpdateOrderStatus: (status: OrderStep) => void;
}

export const LiveTracker: React.FC<LiveTrackerProps> = ({ order, onUpdateOrderStatus }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'driver'; text: string; time: string }>>([
    { sender: 'driver', text: 'สวัสดีครับ คุณณัฐพล ไรเดอร์กำลังนำส่งน้ำดื่ม 4 ถัง + น้ำขวด 2 แพ็ก คาดว่าจะถึงในอีก 12 นาทีครับ', time: '10:35' },
    { sender: 'user', text: 'ขอบคุณครับ ถังเปล่าวางไว้หน้าประตูรั้วแล้วนะครับ', time: '10:37' },
  ]);
  const [inputText, setInputText] = useState('');
  const [callAlert, setCallAlert] = useState<string | null>(null);

  const steps: { key: OrderStep; label: string; sub: string; time: string }[] = [
    { key: 'placed', label: 'รับคำสั่งซื้อแล้ว', sub: 'ระบบบันทึกรายการและเริ่มตรวจสอบคิว', time: '10:15 น.' },
    { key: 'sanitizing', label: 'บรรจุและฆ่าเชื้อด้วย UV', sub: 'ทำความสะอาดถังและตรวจสอบซีลฝา', time: '10:22 น.' },
    { key: 'transit', label: 'ไรเดอร์กำลังเดินทาง (En Route)', sub: 'รถขนส่งหมายเลข 3ขพ 4892 กทม.', time: '10:30 น.' },
    { key: 'delivered', label: 'จัดส่งถึงที่หมายสำเร็จ', sub: 'วาง ณ จุดรับและตรวจนับถังเรียบร้อย', time: '10:45 น.' },
  ];

  const getStepIndex = (status: OrderStep) => {
    switch (status) {
      case 'placed': return 0;
      case 'sanitizing': return 1;
      case 'transit': return 2;
      case 'delivered': return 3;
      default: return 2;
    }
  };

  const currentStepIdx = getStepIndex(order.status);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: inputText,
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulated quick driver reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'driver',
          text: 'รับทราบครับผม กำลังเลี้ยวเข้าซอยแล้วครับ!',
          time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleCallDriver = () => {
    setCallAlert('กำลังเชื่อมต่อสายไปยัง คุณสมชาย (089-876-5432)...');
    setTimeout(() => {
      setCallAlert(null);
    }, 3500);
  };

  return (
    <section id="tracker" className="py-12 lg:py-20 bg-gradient-to-b from-sky-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-[#006194] text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping" />
              <span>ระบบติดตามสถานะจัดส่งแบบเรียลไทม์ (Live Tracking)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
              สถานะคำสั่งซื้อ #{order.id}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              จัดส่งโดยทีมงานมืออาชีพ AquaPure Logistics พร้อมรถควบคุมความสะอาดมาตรฐาน
            </p>
          </div>

          {/* Interactive Simulation Switcher */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-sky-100 shadow-xs self-start md:self-auto">
            <span className="text-xs text-slate-500 font-medium pl-2">จำลองสถานะ:</span>
            <button
              onClick={() => onUpdateOrderStatus('sanitizing')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium cursor-pointer transition-colors ${
                order.status === 'sanitizing' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              กำลังเตรียม
            </button>
            <button
              onClick={() => onUpdateOrderStatus('transit')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium cursor-pointer transition-colors ${
                order.status === 'transit' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              กำลังจัดส่ง
            </button>
            <button
              onClick={() => onUpdateOrderStatus('delivered')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium cursor-pointer transition-colors ${
                order.status === 'delivered' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-emerald-50'
              }`}
            >
              ส่งสำเร็จแล้ว
            </button>
          </div>
        </div>

        {/* Call Toast Notification */}
        {callAlert && (
          <div className="mb-6 p-4 rounded-xl bg-[#006194] text-white flex items-center justify-between shadow-lg animate-bounce">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 animate-pulse text-sky-200" />
              <span className="text-sm font-medium">{callAlert}</span>
            </div>
            <button 
              onClick={() => setCallAlert(null)}
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full cursor-pointer"
            >
              วางสาย
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols): Step-by-step trail & Map */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step-by-step dispatch trail card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-sky-100">
              <div className="flex items-center justify-between pb-6 border-b border-sky-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-sky-600 uppercase">ประมาณการส่งถึง</span>
                    <h3 className="text-xl font-bold text-slate-900">
                      {order.status === 'delivered' ? 'ส่งมอบสินค้าเรียบร้อยแล้ว' : 'อีกประมาณ 12 - 15 นาที'}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500">รอบเวลาที่เลือก</span>
                  <p className="text-sm font-semibold text-slate-800">{order.deliveryTimeSlot}</p>
                </div>
              </div>

              {/* Progress Stepper Trail */}
              <div className="mt-8 relative">
                {/* Connecting Line */}
                <div className="absolute top-5 left-4 right-4 sm:left-6 sm:right-6 h-1 bg-slate-100 -z-0">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-teal-500 transition-all duration-700"
                    style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Nodes */}
                <div className="grid grid-cols-4 gap-2 relative z-10">
                  {steps.map((st, idx) => {
                    const isCompleted = idx < currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    const isPending = idx > currentStepIdx;

                    return (
                      <div key={st.key} className="flex flex-col items-center text-center">
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                            isCompleted
                              ? 'bg-teal-600 text-white shadow-md'
                              : isCurrent
                              ? 'bg-gradient-to-r from-[#006194] to-[#0284C7] text-white ring-4 ring-sky-100 shadow-md scale-110'
                              : 'bg-white border-2 border-slate-200 text-slate-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : isCurrent ? (
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                            </span>
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>

                        <div className="mt-3">
                          <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-sky-700' : isCompleted ? 'text-teal-800' : 'text-slate-400'}`}>
                            {st.label}
                          </p>
                          <p className="hidden sm:block text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {st.sub}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                            {st.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Map Vector Representation */}
              <div className="mt-8 rounded-xl overflow-hidden border border-sky-100 bg-[#EBF4FA] relative p-6 h-56 flex flex-col justify-between">
                {/* SVG Route Visualization */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M 50 180 Q 200 40 450 100 T 800 60" 
                    fill="none" 
                    stroke="#0284C7" 
                    strokeWidth="4" 
                    strokeDasharray="6 6"
                  />
                  {/* Road Grid lines */}
                  <line x1="0" y1="90" x2="1000" y2="90" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="0" y1="160" x2="1000" y2="160" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="250" y1="0" x2="250" y2="300" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="600" y1="0" x2="600" y2="300" stroke="#cbd5e1" strokeWidth="1" />
                </svg>

                {/* Warehouse Pin */}
                <div className="relative z-10 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-lg border border-sky-200 self-start shadow-xs">
                  <Package className="w-4 h-4 text-sky-700" />
                  <span className="text-xs font-semibold text-slate-700">ศูนย์กระจายน้ำดื่มสุขุมวิท</span>
                </div>

                {/* Moving Van Pin (Animated) */}
                <div 
                  className="relative z-10 flex items-center gap-2 bg-[#006194] text-white px-3 py-1.5 rounded-full shadow-lg self-center transform transition-transform duration-1000"
                  style={{
                    transform: order.status === 'delivered' ? 'translateX(180px)' : order.status === 'sanitizing' ? 'translateX(-120px)' : 'translateX(30px)'
                  }}
                >
                  <Truck className="w-4 h-4 text-sky-200 animate-bounce" />
                  <span className="text-xs font-bold">ไรเดอร์คุณสมชาย (3ขพ 4892)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {/* Customer Destination Pin */}
                <div className="relative z-10 flex items-center gap-2 bg-emerald-700 text-white px-3 py-1.5 rounded-lg border border-emerald-600 self-end shadow-xs">
                  <MapPin className="w-4 h-4 text-emerald-200" />
                  <span className="text-xs font-semibold">บ้านคุณณัฐพล (จุดส่งมอบ)</span>
                </div>
              </div>

            </div>

            {/* Order Items Summary Card */}
            <div className="glass-panel rounded-2xl p-5 border border-sky-100">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-sky-600" />
                <span>รายการสินค้าในรอบนี้</span>
              </h4>
              <div className="divide-y divide-sky-100/60">
                {order.items.map((item, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                        {item.quantity}x
                      </span>
                      <span className="font-medium text-slate-800">{item.productName}</span>
                    </div>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      ฿{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 mt-2 border-t border-sky-100 flex items-center justify-between text-xs text-slate-600">
                <span>ยอดชำระแล้ว (ผ่าน PromptPay QR):</span>
                <span className="font-bold text-base text-[#006194] tabular-nums">
                  ฿{order.totalAmount}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Driver Info & Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Driver Profile Card */}
            <div className="glass-panel rounded-2xl p-6 border border-sky-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#006194] to-[#0EA5E9] text-white flex items-center justify-center text-xl font-bold shadow-md">
                  สช
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    <span>ฉีดวัคซีน & ตรวจ ATK สม่ำเสมอ</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 mt-1">
                    {order.driverInfo?.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    ยานพาหนะ: {order.driverInfo?.vehiclePlate}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={handleCallDriver}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-semibold text-xs transition-colors cursor-pointer border border-sky-200"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>โทรหาไรเดอร์</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChatOpen(!chatOpen)}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors cursor-pointer border ${
                    chatOpen
                      ? 'bg-sky-600 text-white border-transparent'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{chatOpen ? 'ปิดแชท' : 'ส่งข้อความ'}</span>
                </button>
              </div>

              {/* Interactive In-App Driver Chat Drawer */}
              {chatOpen && (
                <div className="bg-slate-50 rounded-xl p-3 border border-sky-100 space-y-3 mb-4">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-200">
                    แชทตรงกับไรเดอร์
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`p-2.5 rounded-xl max-w-[85%] ${
                            msg.sender === 'user'
                              ? 'bg-sky-600 text-white rounded-br-xs'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span
                            className={`text-[9px] block text-right mt-1 ${
                              msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                            }`}
                          >
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder="พิมพ์ข้อความถึงไรเดอร์..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs focus:outline-hidden focus:border-sky-500"
                    />
                    <button
                      type="submit"
                      aria-label="ส่งข้อความ"
                      className="px-3 py-1.5 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 cursor-pointer flex items-center justify-center"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Delivery Address & Note */}
              <div className="space-y-3 pt-4 border-t border-sky-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">สถานที่จัดส่ง:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {order.address.recipientName} ({order.address.phone})
                  </p>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {order.address.addressLine} แขวง{order.address.subDistrict} เขต{order.address.district} {order.address.province} {order.address.postalCode}
                  </p>
                </div>

                {order.address.deliveryNote && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900">
                    <span className="font-semibold block">คำแนะนำจุดวางถัง:</span>
                    <span className="text-[11px]">{order.address.deliveryNote}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Safety & Guarantee Box */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#006194] to-[#0284C7] text-white">
              <h5 className="font-bold text-sm flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-sky-200" />
                <span>การรับประกันถังสะอาด 100%</span>
              </h5>
              <p className="text-xs text-sky-100 leading-relaxed">
                หากพบถังมีรอยรั่ว ซึม หรือซีลฝาไม่สมบูรณ์ สามารถแจ้งไรเดอร์ขอเปลี่ยนถังใหม่ได้ทันทีโดยไม่มีค่าใช้จ่าย
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
