import React, { useState } from 'react';
import { Calendar, RefreshCw, PauseCircle, PlayCircle, Check, Clock, AlertCircle, MapPin } from 'lucide-react';

export const SubscriptionManager: React.FC = () => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [bottleCount, setBottleCount] = useState<number>(4);
  const [deliverySlot, setDeliverySlot] = useState<string>('morning');
  const [skippedNotice, setSkippedNotice] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Delivery schedule items
  const [schedule, setSchedule] = useState([
    { date: 'วันจันทร์ที่ 2 พ.ย. 2569', status: 'upcoming', bottles: 4, note: 'รอบปกติ' },
    { date: 'วันจันทร์ที่ 9 พ.ย. 2569', status: 'upcoming', bottles: 4, note: 'รอบปกติ' },
    { date: 'วันจันทร์ที่ 16 พ.ย. 2569', status: 'upcoming', bottles: 4, note: 'รอบปกติ' },
    { date: 'วันจันทร์ที่ 23 พ.ย. 2569', status: 'upcoming', bottles: 4, note: 'รอบปกติ' },
  ]);

  const handleSkipNext = () => {
    setSchedule(prev => {
      const copy = [...prev];
      if (copy.length > 0) {
        copy[0] = { ...copy[0], status: 'skipped', note: 'ข้ามรอบตามที่ผู้ใช้ร้องขอ' };
      }
      return copy;
    });
    setSkippedNotice(true);
    setTimeout(() => setSkippedNotice(false), 3000);
  };

  const handleSaveChanges = () => {
    setSchedule(prev => prev.map(s => s.status === 'upcoming' ? { ...s, bottles: bottleCount } : s));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-sky-100 bg-white/95">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-sky-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#006194] text-xs font-semibold mb-2 border border-sky-100">
              <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
              <span>ศูนย์จัดการแผนสมาชิกรายรอบ (Subscription Portal)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              การจัดส่งรอบประจำของคุณ
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              แผนปัจจุบัน: น้ำดื่มถัง 18.9 ลิตร (สมาชิก VIP ประหยัด 20%) ส่งทุกวันจันทร์
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                isPaused
                  ? 'bg-amber-500 text-white border-transparent shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isPaused ? (
                <>
                  <PlayCircle className="w-4 h-4 text-white" />
                  <span>กดเพื่อเปิดใช้งานต่อ</span>
                </>
              ) : (
                <>
                  <PauseCircle className="w-4 h-4 text-slate-500" />
                  <span>พักแผนจัดส่งชั่วคราว</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notices */}
        {skippedNotice && (
          <div className="mt-4 p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sky-600" />
              <span>เลื่อนข้ามรอบส่งถัดไปเรียบร้อยแล้ว ไม่มีการตัดยอดเงินในรอบนี้</span>
            </div>
          </div>
        )}

        {savedNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>บันทึกการปรับเปลี่ยนจำนวนถังและช่วงเวลาจัดส่งแล้ว</span>
          </div>
        )}

        {/* Paused State Banner */}
        {isPaused && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold block">คุณกำลังพักการจัดส่งชั่วคราว</span>
              <span>ระบบจะไม่ส่งน้ำและไม่มีการเรียกเก็บเงินจนกว่าคุณจะกดกลับมาเปิดใช้งานอีกครั้ง</span>
            </div>
          </div>
        )}

        {/* Main Configuration Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Form (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-sky-50/60 p-5 sm:p-6 rounded-2xl border border-sky-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>ปรับแต่งรอบจัดส่งถัดไป</span>
            </h4>

            {/* Bottle Count Adjuster */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                จำนวนถังในรอบถัดไป:
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setBottleCount(Math.max(1, bottleCount - 1))}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="text-base font-bold text-slate-900 w-12 text-center tabular-nums">
                  {bottleCount} ถัง
                </span>
                <button
                  type="button"
                  onClick={() => setBottleCount(bottleCount + 1)}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  +
                </button>
                <span className="text-xs text-sky-700 font-semibold ml-auto tabular-nums">
                  ฿{bottleCount * 65}/รอบ
                </span>
              </div>
            </div>

            {/* Time slot preference */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                ช่วงเวลาที่สะดวกรับน้ำ:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'morning', label: 'เช้า', time: '09:00 - 12:00' },
                  { id: 'afternoon', label: 'บ่าย', time: '13:00 - 17:00' },
                  { id: 'evening', label: 'เย็น', time: '17:00 - 20:00' },
                ].map(slot => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setDeliverySlot(slot.id)}
                    className={`p-2 rounded-xl text-center border cursor-pointer transition-all ${
                      deliverySlot === slot.id
                        ? 'bg-gradient-to-r from-[#006194] to-[#0284C7] text-white border-transparent'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{slot.label}</div>
                    <div className={`text-[10px] ${deliverySlot === slot.id ? 'text-sky-100' : 'text-slate-400'}`}>
                      {slot.time}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="w-full glow-btn-primary py-2.5 rounded-full text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                บันทึกการตั้งค่า
              </button>

              <button
                type="button"
                onClick={handleSkipNext}
                className="w-full py-2.5 rounded-full bg-white border border-amber-200 text-amber-800 hover:bg-amber-50 font-semibold text-xs cursor-pointer transition-colors"
              >
                เลื่อนข้ามรอบส่งถัดไป (Skip 1 รอบ)
              </button>
            </div>
          </div>

          {/* Schedule Calendar List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>ปฏิทินรอบส่งประจำ 4 สัปดาห์ข้างหน้า</span>
              </span>
              <span className="text-xs text-slate-400 font-normal">
                ตัดรอบเวลา 18:00 น. ก่อนวันส่ง
              </span>
            </h4>

            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    item.status === 'skipped'
                      ? 'bg-slate-50 border-dashed border-slate-300 opacity-60'
                      : idx === 0
                      ? 'bg-sky-50/70 border-sky-300 shadow-xs'
                      : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      item.status === 'skipped'
                        ? 'bg-slate-200 text-slate-500'
                        : idx === 0
                        ? 'bg-[#006194] text-white'
                        : 'bg-sky-100 text-sky-700'
                    }`}>
                      {idx + 1}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {item.date}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {item.note} · {item.bottles} ถัง
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    {item.status === 'skipped' ? (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ข้ามรอบแล้ว
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-sky-800 tabular-nums">
                        ฿{item.bottles * 65}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>ที่อยู่ส่งประจำ: 99/42 สุขุมวิท 55 แขวงคลองตันเหนือ วัฒนา กรุงเทพฯ</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
