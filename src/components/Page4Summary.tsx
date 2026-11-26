import React, { useState } from 'react';
import { BananaSvg } from './BananaSvg';
import { SHARING_WAYS, WISE_ELDER_IMG } from '../data/divisionData';
import { playChime, playSoftPop } from '../utils/sound';

interface Page4SummaryProps {
  onPrev: () => void;
  onRestart: () => void;
}

type SummaryZone = 'left' | 'middle' | 'right' | null;

export const Page4Summary: React.FC<Page4SummaryProps> = ({ onPrev, onRestart }) => {
  const [wayIdx, setWayIdx] = useState<number>(0);
  const [activeZone, setActiveZone] = useState<SummaryZone>(null);

  const way = SHARING_WAYS[wayIdx];

  const handleSelectZone = (zone: SummaryZone) => {
    playSoftPop(zone === 'left' ? 0.95 : zone === 'middle' ? 1.1 : 1.25);
    setActiveZone((prev) => (prev === zone ? null : zone));
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#fbf6ea] px-6 py-5 overflow-hidden">
      {/* Top Headline & Equation Switcher */}
      <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 shrink-0">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#3b2914] tracking-tight whitespace-nowrap">
          平均分的算式，用除法
        </h1>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#efe5cf] border border-[#dfcda9]">
          {SHARING_WAYS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                playChime();
                setWayIdx(idx);
              }}
              className={`min-h-[40px] px-4 py-1.5 rounded-xl text-base font-bold tabular-math whitespace-nowrap cursor-pointer transition-all ${
                wayIdx === idx
                  ? 'bg-[#fffdf8] text-[#9a3412] shadow-sm'
                  : 'text-[#6b4e2e] hover:text-[#3b2914]'
              }`}
            >
              12 ÷ {item.groups} = {item.perGroup}
            </button>
          ))}
        </div>
      </div>

      {/* Main Summary Stage */}
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-5 my-2 min-h-0">
        {/* Three Structural Pillars aligned directly with Left / Middle / Right */}
        <div className="w-full grid grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {/* 左边：被分的总数 */}
          <button
            type="button"
            onClick={() => handleSelectZone('left')}
            className={`flex flex-col items-center justify-between gap-3 p-5 rounded-3xl border-2 cursor-pointer transition-all duration-150 ${
              activeZone === 'left'
                ? 'bg-amber-100 border-amber-500 shadow-lg -translate-y-1'
                : 'bg-[#fffdf8] border-amber-300 hover:border-amber-400 shadow-sm'
            }`}
          >
            <span className="text-lg font-bold text-amber-800">左边</span>
            <span className="text-5xl sm:text-6xl font-bold text-[#3b2914] tabular-math">12</span>
            <span className="text-xl sm:text-2xl font-bold text-amber-900">被分的总数</span>
          </button>

          {/* 中间：分法 */}
          <button
            type="button"
            onClick={() => handleSelectZone('middle')}
            className={`flex flex-col items-center justify-between gap-3 p-5 rounded-3xl border-2 cursor-pointer transition-all duration-150 ${
              activeZone === 'middle'
                ? 'bg-sky-100 border-sky-500 shadow-lg -translate-y-1'
                : 'bg-[#fffdf8] border-sky-300 hover:border-sky-400 shadow-sm'
            }`}
          >
            <span className="text-lg font-bold text-sky-800">中间</span>
            <span className="text-5xl sm:text-6xl font-bold text-[#0369a1] tabular-math">
              <span className="text-rose-600 mr-1.5">÷</span>
              {way.groups}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-sky-900">分法</span>
          </button>

          {/* 最后：结果 */}
          <button
            type="button"
            onClick={() => handleSelectZone('right')}
            className={`flex flex-col items-center justify-between gap-3 p-5 rounded-3xl border-2 cursor-pointer transition-all duration-150 ${
              activeZone === 'right'
                ? 'bg-emerald-100 border-emerald-500 shadow-lg -translate-y-1'
                : 'bg-[#fffdf8] border-emerald-300 hover:border-emerald-400 shadow-sm'
            }`}
          >
            <span className="text-lg font-bold text-emerald-800">最后</span>
            <span className="text-5xl sm:text-6xl font-bold text-[#047857] tabular-math">
              = {way.perGroup}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-900">结果</span>
          </button>
        </div>

        {/* Synced Banana Visual + Wise Elder */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 rounded-3xl bg-[#fffdf8] border-2 border-[#e5d5b5] shadow-sm">
          <div
            className={`flex-1 flex flex-wrap items-center justify-center gap-2.5 p-2 rounded-2xl transition-all ${
              activeZone === 'left' ? 'bg-amber-50 ring-2 ring-amber-400' : ''
            }`}
          >
            {Array.from({ length: way.groups }).map((_, gIdx) => (
              <div
                key={gIdx}
                className={`flex items-center gap-0.5 px-2.5 py-2 rounded-2xl border-2 border-dashed transition-all ${
                  activeZone === 'middle' ? 'scale-105 ring-2 ring-sky-400' : ''
                } ${activeZone === 'right' && gIdx === 0 ? 'scale-105 ring-2 ring-emerald-500' : ''}`}
                style={{
                  borderColor: activeZone === 'middle' ? '#0284C7' : way.borderColor,
                  backgroundColor: way.bgTint,
                }}
              >
                {Array.from({ length: way.perGroup }).map((_, bIdx) => (
                  <BananaSvg
                    key={bIdx}
                    className="w-7 h-9 sm:w-8 sm:h-11"
                    highlighted={activeZone === 'left' || (activeZone === 'right' && gIdx === 0)}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <img
              src={WISE_ELDER_IMG}
              alt="智慧老人"
              referrerPolicy="no-referrer"
              className="w-20 h-24 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 shrink-0 pt-1">
        <button
          type="button"
          onClick={onPrev}
          className="min-h-[46px] px-6 py-2 rounded-2xl bg-[#fffdf8] hover:bg-amber-50 text-[#5c3d1e] border-2 border-[#d6b88d] font-bold text-lg whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-all"
        >
          上一页
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="min-h-[46px] px-8 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-md whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-all"
        >
          重新开始
        </button>
      </div>
    </div>
  );
};
