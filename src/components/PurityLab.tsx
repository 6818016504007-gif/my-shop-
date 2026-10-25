import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, FileText, Droplets, Sparkles, Layers, Activity, Download } from 'lucide-react';

export const PurityLab: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(3); // Default RO
  const [downloadModal, setDownloadModal] = useState<boolean>(false);

  const stages = [
    {
      step: 1,
      title: 'Sediment Pre-Filter',
      nameTh: 'กรองตะกอนหยาบ 5 ไมครอน',
      desc: 'ดักจับฝุ่นผง ทราย สนิมเหล็ก และสิ่งแขวนลอยขนาดใหญ่ที่ปนเปื้อนมากับน้ำดิบ',
      efficiency: '100% ดักจับตะกอน',
    },
    {
      step: 2,
      title: 'Activated Carbon Filter',
      nameTh: 'คาร์บอนกัมมันต์ดูดซับกลิ่น',
      desc: 'ดูดซับสารคลอรีน กลิ่น สี และสารเคมีอินทรีย์ตกค้างอย่างมีประสิทธิภาพ',
      efficiency: 'ลดกลิ่นคลอรีน 99.8%',
    },
    {
      step: 3,
      title: 'Block Carbon & Resin',
      nameTh: 'คาร์บอนอัดแท่งและเรซินลดความกระด้าง',
      desc: 'ขจัดสารประกอบโลหะหนักส่วนเกิน ลดความกระด้างของน้ำ ป้องกันตะกรัน',
      efficiency: 'ลดความกระด้าง 98.5%',
    },
    {
      step: 4,
      title: 'Reverse Osmosis (RO) Membrane',
      nameTh: 'เมมเบรน RO ความละเอียด 0.0001 ไมครอน',
      desc: 'หัวใจสำคัญของการกรอง ละเอียดกว่าเส้นผมมนุษย์ 500,000 เท่า กรองสารละลาย แบคทีเรีย ไวรัส และจุลินทรีย์ได้หมดจด',
      efficiency: 'บริสุทธิ์ 99.98% (TDS < 10 ppm)',
    },
    {
      step: 5,
      title: 'Post Carbon Mineral Polishing',
      nameTh: 'ปรับสภาพรสชาติและเพิ่มแร่ธาตุจำเป็น',
      desc: 'ปรับสมดุลความเป็นกรด-ด่างให้อยู่ที่ pH 7.4 และคืนแร่ธาตุธรรมชาติในปริมาณที่เหมาะสม รสชาตินุ่มละมุนลิ้น',
      efficiency: 'สมดุล pH 7.4 สดชื่นดื่มง่าย',
    },
    {
      step: 6,
      title: 'Micro Ozone Sterilization',
      nameTh: 'ฆ่าเชื้อด้วยก๊าซโอโซนบริสุทธิ์',
      desc: 'สลายจุลชีพ เชื้อรา และสารตกค้างในระดับโมเลกุล โดยโอโซนจะสลายตัวกลับเป็นออกซิเจนบริสุทธิ์ (O2) 100%',
      efficiency: 'ฆ่าเชื้อแบคทีเรีย 99.99%',
    },
    {
      step: 7,
      title: 'Ultraviolet (UV) Final Chamber',
      nameTh: 'รังสี UV ฆ่าเชื้อขั้นตอนสุดท้าย',
      desc: 'ฉายรังสี UV-C ทันทีในท่อสแตนเลสก่อนเข้าสู่หัวบรรจุลงถังที่ปลอดเชื้อแบบปิดสนิท (Clean Room Class 100)',
      efficiency: 'มาตรฐานห้องปลอดเชื้อสากล',
    },
  ];

  const labParams = [
    { label: 'ค่าสารละลายรวม (TDS)', value: '8.4 ppm', standard: '< 50 ppm', status: 'ดีเยี่ยม (Purity)' },
    { label: 'ค่าความเป็นกรด-ด่าง (pH)', value: '7.42', standard: '6.5 - 8.5', status: 'สมดุลธรรมชาติ' },
    { label: 'โคลิฟอร์มและอีโคไล', value: 'ไม่พบ (0 cfu)', standard: 'ต้องไม่พบ', status: 'ปลอดเชื้อ 100%' },
    { label: 'โลหะหนัก (ตะกั่ว, ปรอท)', value: 'ตรวจไม่พบ', standard: '< 0.01 mg/L', status: 'ปลอดภัยระดับแล็บ' },
    { label: 'ความกระด้างของน้ำ', value: '12 mg/L', standard: '< 100 mg/L', status: 'น้ำอ่อน ดื่มลื่นคอ' },
    { label: 'ความขุ่น (Turbidity)', value: '0.12 NTU', standard: '< 5 NTU', status: 'ใสบริสุทธิ์' },
  ];

  return (
    <section id="purity" className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>มาตรฐานรับรองคุณภาพน้ำดื่มและการันตีผลแล็บ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b1c30]">
          ความสะอาดที่พิสูจน์ได้ทุกหยด ด้วยกระบวนการ 7 ขั้นตอน
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          ทุกถังของ AquaPure บรรจุในห้อง Clean Room มาตรฐานโรงพยาบาล พร้อมสุ่มตรวจวิเคราะห์คุณภาพทุกล็อตการผลิต
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Interactive 7-Stage Process */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-sky-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-600" />
              <span>ลำดับขั้นตอนการกรองน้ำ (คลิกเพื่อดูรายละเอียด)</span>
            </h3>
            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
              7-Stage Filtration
            </span>
          </div>

          {/* Stepper tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
            {stages.map((st, idx) => (
              <button
                key={st.step}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer border ${
                  activeStage === idx
                    ? 'bg-[#006194] text-white border-transparent shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                }`}
              >
                ขั้นตอนที่ {st.step}
              </button>
            ))}
          </div>

          {/* Active Stage Detail Showcase */}
          <div className="bg-sky-50/80 rounded-2xl p-6 border border-sky-100 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  ขั้นตอนที่ {stages[activeStage].step}: {stages[activeStage].title}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  {stages[activeStage].nameTh}
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-sky-600 font-bold text-sm">
                0{stages[activeStage].step}
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {stages[activeStage].desc}
            </p>

            <div className="mt-4 pt-4 border-t border-sky-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">ประสิทธิภาพการกรอง:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {stages[activeStage].efficiency}
              </span>
            </div>
          </div>

          {/* Quick List of All Stages */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {stages.map((st, idx) => (
              <div 
                key={st.step}
                onClick={() => setActiveStage(idx)}
                className={`p-2.5 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeStage === idx ? 'bg-sky-100/80 text-sky-900 font-semibold' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStage === idx ? 'bg-[#006194] text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {st.step}
                </div>
                <span className="truncate">{st.nameTh}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column (5 cols): Live Lab Analysis Card */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 border border-sky-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-sky-100">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  ผลตรวจวิเคราะห์จากห้องแล็บ
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                ล็อต: AQP-2026-10
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2 mb-4">
              ทดสอบโดยสถาบันวิจัยวิทยาศาสตร์และเทคโนโลยีแห่งประเทศไทย (วว.)
            </p>

            {/* Test Parameters Table */}
            <div className="space-y-2.5">
              {labParams.map((param, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-slate-800 block">{param.label}</span>
                    <span className="text-[11px] text-slate-400">เกณฑ์มาตรฐาน: {param.standard}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-sky-800 block tabular-nums text-sm">{param.value}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      {param.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Download Action */}
          <div className="mt-6 pt-4 border-t border-sky-100">
            <button
              type="button"
              onClick={() => setDownloadModal(true)}
              className="w-full py-3 rounded-full bg-white border border-sky-300 text-sky-800 hover:bg-sky-50 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>ดูใบรับรองผลตรวจคุณภาพน้ำ (PDF)</span>
            </button>
          </div>

        </div>

      </div>

      {/* Certificate Modal */}
      {downloadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-sky-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-lg">ใบรับรองคุณภาพน้ำดื่ม AquaPure</h4>
              </div>
              <button
                type="button"
                onClick={() => setDownloadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-center space-y-1">
                <p className="font-bold text-slate-800 text-sm">เลขที่ใบอนุญาต อย.: 10-1-08962-5-0012</p>
                <p className="text-slate-500">รับรองมาตรฐาน ISO 22000, HACCP, GHPs และ ฮาลาล</p>
                <p className="text-emerald-700 font-semibold mt-1">ผลการทดสอบ: ผ่านเกณฑ์มาตรฐานน้ำดื่มบริโภค 100%</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-50">
                  <span className="text-slate-400 block">วันที่ตรวจสอบ:</span>
                  <span className="font-semibold text-slate-700">15 ตุลาคม 2569</span>
                </div>
                <div className="p-2 rounded bg-slate-50">
                  <span className="text-slate-400 block">ห้องปฏิบัติการ:</span>
                  <span className="font-semibold text-slate-700">Central Laboratory (Thailand)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  alert('ดาวน์โหลดไฟล์เอกสารผลตรวจวิเคราะห์ตัวจริงเรียบร้อยแล้ว (PDF)');
                  setDownloadModal(false);
                }}
                className="flex-1 glow-btn-primary py-2.5 rounded-full text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลดเอกสารฉบับเต็ม</span>
              </button>
              <button
                type="button"
                onClick={() => setDownloadModal(false)}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
