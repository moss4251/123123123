import React, { useState } from 'react';
import { BananaSvg } from './BananaSvg';
import { DIVISION_WAYS, WISE_ELDER_IMG } from '../data/divisionData';
import { playChime, playSoftPop } from '../utils/sound';

interface Page3DivisionProps {
  onPrev: () => void;
  onNext: () => void;
}

type FocusCol = 0 | 1 | 2 | null;
type PartKey = 'dividend' | 'symbol' | 'divisor' | 'quotient' | null;

export const Page3Division: React.FC<Page3DivisionProps> = ({ onPrev, onNext }) => {
  const [wayIdx, setWayIdx] = useState<number>(0);
  const [showReading, setShowReading] = useState<boolean>(false);
  const [focusCol, setFocusCol] = useState<FocusCol>(null);
  const [revealedCols, setRevealedCols] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const [activePart, setActivePart] = useState<PartKey>(null);

  const way = DIVISION_WAYS[wayIdx];

  const selectWay = (idx: number) => {
    playSoftPop(1 + idx * 0.04);
    setWayIdx(idx);
    setFocusCol(null);
    setActivePart(null);
    setRevealedCols([false, false, false]);
  };

  const handleCellClick = (col: 0 | 1 | 2) => {
    setFocusCol(col);
    setRevealedCols((prev) => {
      const next: [boolean, boolean, boolean] = [...prev] as [boolean, boolean, boolean];
      next[col] = true;
      if (next[0] && next[1] && next[2]) {
        playChime();
      } else {
        playSoftPop(1 + col * 0.1);
      }
      return next;
    });
  };

  const handleResetCells = () => {
    playSoftPop(0.9);
    setRevealedCols([false, false, false]);
    setFocusCol(null);
  };

  const handleNextStep = () => {
    if (!showReading) {
      if (wayIdx < DIVISION_WAYS.length - 1) {
        selectWay(wayIdx + 1);
      } else {
        playChime();
        setShowReading(true);
        setActivePart('symbol');
      }
    } else {
      onNext();
    }
  };

  // Highlight semantics on the banana grouping diagram
  const highlightAll = focusCol === 0 || activePart === 'dividend';
  const highlightBoxes =
    (way.mode === 'byGroups' && focusCol === 1) ||
    (way.mode === 'bySize' && focusCol === 2) ||
    (way.mode === 'byGroups' && activePart === 'divisor') ||
    (way.mode === 'bySize' && activePart === 'quotient');
  const highlightFirstGroupBananas =
    (way.mode === 'byGroups' && focusCol === 2) ||
    (way.mode === 'bySize' && focusCol === 1) ||
    (way.mode === 'byGroups' && activePart === 'quotient') ||
    (way.mode === 'bySize' && activePart === 'divisor');

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#fbf6ea] px-6 py-5 overflow-hidden">
      {/* Top Title & Way Switcher */}
      <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#3b2914] tracking-tight whitespace-nowrap">
          认识除法算式
        </h1>

        <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-[#efe5cf] border border-[#dfcda9]">
          {DIVISION_WAYS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setShowReading(false);
                selectWay(idx);
              }}
              className={`min-h-[38px] px-3 py-1 rounded-xl text-sm sm:text-base font-bold whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
                !showReading && wayIdx === idx
                  ? 'bg-[#fffdf8] text-[#9a3412] shadow-sm'
                  : 'text-[#6b4e2e] hover:text-[#3b2914]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              playChime();
              setShowReading(true);
              setActivePart('symbol');
            }}
            className={`min-h-[38px] px-3.5 py-1 rounded-xl text-sm sm:text-base font-bold whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
              showReading
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-[#6b4e2e] hover:text-[#3b2914]'
            }`}
          >
            读法
          </button>
        </div>
      </div>

      {/* Main Split Stage */}
      <div className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2 min-h-0">
        {/* Left: Visual Grouping Diagram */}
        <div
          className="lg:col-span-5 h-full max-h-[430px] flex flex-col justify-between p-5 rounded-3xl bg-[#fffdf8] border-2 shadow-sm"
          style={{ borderColor: way.borderColor }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <img
                src={way.characterImg}
                alt={way.characterName}
                referrerPolicy="no-referrer"
                className="w-14 h-16 object-contain"
              />
              <div>
                <div className="text-xl font-bold" style={{ color: way.color }}>
                  {way.label}
                </div>
                <div className="text-base font-bold text-[#5c3d1e] tabular-math">
                  {way.phrase}
                </div>
              </div>
            </div>

            {showReading && (
              <div className="flex flex-wrap items-center justify-end gap-1">
                {DIVISION_WAYS.map((w, idx) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => selectWay(idx)}
                    className={`min-w-[32px] min-h-[32px] px-1.5 rounded-lg text-xs font-bold tabular-math cursor-pointer border transition-all ${
                      wayIdx === idx
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 12 Bananas in Neat Equal Groups */}
          <div
            className={`flex-1 flex flex-wrap items-center justify-center gap-2.5 py-3 rounded-2xl transition-all ${
              highlightAll ? 'ring-3 ring-amber-400 bg-amber-50/50' : ''
            }`}
          >
            {Array.from({ length: way.groups }).map((_, gIdx) => (
              <div
                key={gIdx}
                className={`relative flex items-center justify-center gap-0.5 px-2.5 py-2 rounded-2xl border-2 border-dashed transition-all ${
                  highlightBoxes ? 'scale-105 shadow-md ring-2 ring-sky-400' : ''
                } ${
                  highlightFirstGroupBananas && gIdx === 0
                    ? 'scale-105 shadow-md ring-2 ring-emerald-500'
                    : ''
                }`}
                style={{
                  borderColor: highlightBoxes ? '#0284C7' : way.borderColor,
                  backgroundColor: way.bgTint,
                }}
              >
                {Array.from({ length: way.perGroup }).map((_, bIdx) => (
                  <BananaSvg
                    key={bIdx}
                    className={`${
                      way.perGroup >= 6 ? 'w-7 h-9 sm:w-8 sm:h-10' : 'w-8 h-10 sm:w-9 sm:h-12'
                    }`}
                    highlighted={highlightAll || (highlightFirstGroupBananas && gIdx === 0)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right: 1-to-1 Click-to-Reveal Grid OR Reading & Parts View */}
        <div className="lg:col-span-7 h-full max-h-[430px] flex flex-col justify-center p-6 rounded-3xl bg-[#fffdf8] border-2 border-[#e5d5b5] shadow-sm">
          {!showReading ? (
            <div className="w-full flex flex-col gap-5">
              {/* Row 1: Three Equal Grid Cells of Math Info (Click to reveal corresponding number) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleCellClick(0)}
                  className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                    focusCol === 0
                      ? 'bg-amber-100 border-amber-500 shadow-md -translate-y-0.5'
                      : revealedCols[0]
                        ? 'bg-amber-50/70 border-amber-300'
                        : 'bg-[#fcf8ee] border-[#e6d5b8] hover:border-amber-400 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="text-lg sm:text-xl font-bold text-[#3b2914] tabular-math">
                    {way.info1}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCellClick(1)}
                  className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                    focusCol === 1
                      ? 'bg-sky-100 border-sky-500 shadow-md -translate-y-0.5'
                      : revealedCols[1]
                        ? 'bg-sky-50/70 border-sky-300'
                        : 'bg-[#fcf8ee] border-[#e6d5b8] hover:border-sky-400 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="text-lg sm:text-xl font-bold text-[#0369a1] tabular-math">
                    {way.info2}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCellClick(2)}
                  className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                    focusCol === 2
                      ? 'bg-emerald-100 border-emerald-500 shadow-md -translate-y-0.5'
                      : revealedCols[2]
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-[#fcf8ee] border-[#e6d5b8] hover:border-emerald-400 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="text-lg sm:text-xl font-bold text-[#047857] tabular-math">
                    {way.info3}
                  </div>
                </button>
              </div>

              {/* Row 2: 1-to-1 Alignment Connectors */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                <div
                  className={`text-2xl font-bold transition-opacity ${
                    revealedCols[0] ? 'text-amber-500 opacity-100' : 'text-stone-300 opacity-60'
                  }`}
                >
                  ↓
                </div>
                <div
                  className={`text-2xl font-bold transition-opacity ${
                    revealedCols[1] ? 'text-sky-500 opacity-100' : 'text-stone-300 opacity-60'
                  }`}
                >
                  ↓
                </div>
                <div
                  className={`text-2xl font-bold transition-opacity ${
                    revealedCols[2] ? 'text-emerald-500 opacity-100' : 'text-stone-300 opacity-60'
                  }`}
                >
                  ↓
                </div>
              </div>

              {/* Row 3: Division Equation Slots (revealed by clicking the corresponding info cell) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 items-center">
                <button
                  type="button"
                  onClick={() => handleCellClick(0)}
                  className={`min-h-[96px] py-4 px-3 rounded-2xl border-2 text-center cursor-pointer transition-all tabular-math ${
                    revealedCols[0]
                      ? focusCol === 0
                        ? 'bg-amber-100 border-amber-500 scale-105'
                        : 'bg-amber-50/70 border-amber-300'
                      : 'bg-stone-50 border-dashed border-stone-300 hover:border-amber-400'
                  }`}
                >
                  {revealedCols[0] ? (
                    <span className="text-4xl sm:text-5xl font-bold text-[#3b2914] animate-banana-pop inline-block">
                      12
                    </span>
                  ) : (
                    <span className="text-3xl font-bold text-stone-300">?</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleCellClick(1)}
                  className={`min-h-[96px] py-4 px-3 rounded-2xl border-2 text-center cursor-pointer transition-all tabular-math ${
                    revealedCols[1]
                      ? focusCol === 1
                        ? 'bg-sky-100 border-sky-500 scale-105'
                        : 'bg-sky-50/70 border-sky-300'
                      : 'bg-stone-50 border-dashed border-stone-300 hover:border-sky-400'
                  }`}
                >
                  {revealedCols[1] ? (
                    <span className="text-4xl sm:text-5xl font-bold text-[#0369a1] animate-banana-pop inline-block">
                      <span className="text-rose-600 mr-1.5">÷</span>
                      {way.divisor}
                    </span>
                  ) : (
                    <span className="text-3xl font-bold text-stone-300">?</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleCellClick(2)}
                  className={`min-h-[96px] py-4 px-3 rounded-2xl border-2 text-center cursor-pointer transition-all tabular-math ${
                    revealedCols[2]
                      ? focusCol === 2
                        ? 'bg-emerald-100 border-emerald-500 scale-105'
                        : 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-stone-50 border-dashed border-stone-300 hover:border-emerald-400'
                  }`}
                >
                  {revealedCols[2] ? (
                    <span className="text-3xl sm:text-4xl font-bold text-[#047857] whitespace-nowrap animate-banana-pop inline-block">
                      = {way.quotient}
                      <span className="text-xl sm:text-2xl ml-0.5">（{way.unit}）</span>
                    </span>
                  ) : (
                    <span className="text-3xl font-bold text-stone-300">?</span>
                  )}
                </button>
              </div>

              {/* Reset cells button */}
              <div className="flex justify-center pt-1 min-h-[42px]">
                {(revealedCols[0] || revealedCols[1] || revealedCols[2]) && (
                  <button
                    type="button"
                    onClick={handleResetCells}
                    className="min-h-[42px] px-6 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#78350f] font-bold text-base border border-amber-300 cursor-pointer transition-colors"
                  >
                    重填
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Parts Names & Reading View */
            <div className="w-full flex flex-col items-center gap-5 animate-banana-pop">
              {/* Equation with 4 interactive clickable parts */}
              <div className="w-full grid grid-cols-5 items-center text-center gap-2">
                {/* 12: 被除数 */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSoftPop(1);
                      setActivePart('dividend');
                    }}
                    className={`w-full py-3 rounded-2xl border-2 text-4xl sm:text-5xl font-bold tabular-math cursor-pointer transition-all ${
                      activePart === 'dividend'
                        ? 'bg-amber-100 border-amber-500 text-amber-900 scale-105'
                        : 'bg-[#fcf8ee] border-[#e6d5b8] text-[#3b2914]'
                    }`}
                  >
                    12
                  </button>
                  <span className="text-base font-bold text-amber-700">↓</span>
                  <button
                    type="button"
                    onClick={() => {
                      playSoftPop(1);
                      setActivePart('dividend');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-base sm:text-lg cursor-pointer transition-all whitespace-nowrap ${
                      activePart === 'dividend'
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    被除数
                  </button>
                </div>

                {/* ÷: 除号 */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSoftPop(1.1);
                      setActivePart('symbol');
                    }}
                    className={`w-full py-3 rounded-2xl border-2 text-4xl sm:text-5xl font-bold cursor-pointer transition-all ${
                      activePart === 'symbol'
                        ? 'bg-rose-100 border-rose-500 text-rose-700 scale-105'
                        : 'bg-[#fcf8ee] border-[#e6d5b8] text-rose-600'
                    }`}
                  >
                    ÷
                  </button>
                  <span className="text-base font-bold text-rose-500">↓</span>
                  <button
                    type="button"
                    onClick={() => {
                      playSoftPop(1.1);
                      setActivePart('symbol');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-base sm:text-lg cursor-pointer transition-all whitespace-nowrap ${
                      activePart === 'symbol'
                        ? 'bg-rose-500 text-white'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    除号
                  </button>
                </div>

                {/* divisor: 除数 */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSoftPop(1.15);
                      setActivePart('divisor');
                    }}
                    className={`w-full py-3 rounded-2xl border-2 text-4xl sm:text-5xl font-bold tabular-math cursor-pointer transition-all ${
                      activePart === 'divisor'
                        ? 'bg-sky-100 border-sky-500 text-sky-900 scale-105'
                        : 'bg-[#fcf8ee] border-[#e6d5b8] text-[#0369a1]'
                    }`}
                  >
                    {way.divisor}
                  </button>
                  <span className="text-base font-bold text-sky-500">↓</span>
                  <button
                    type="button"
                    onClick={() => {
                      playSoftPop(1.15);
                      setActivePart('divisor');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-base sm:text-lg cursor-pointer transition-all whitespace-nowrap ${
                      activePart === 'divisor'
                        ? 'bg-sky-500 text-white'
                        : 'bg-sky-100 text-sky-900'
                    }`}
                  >
                    除数
                  </button>
                </div>

                {/* = */}
                <div className="flex flex-col items-center justify-start pt-3">
                  <span className="text-4xl sm:text-5xl font-bold text-[#5c3d1e]">=</span>
                </div>

                {/* quotient: 商 */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSoftPop(1.25);
                      setActivePart('quotient');
                    }}
                    className={`w-full py-3 rounded-2xl border-2 text-4xl sm:text-5xl font-bold tabular-math cursor-pointer transition-all ${
                      activePart === 'quotient'
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900 scale-105'
                        : 'bg-[#fcf8ee] border-[#e6d5b8] text-[#047857]'
                    }`}
                  >
                    {way.quotient}
                  </button>
                  <span className="text-base font-bold text-emerald-500">↓</span>
                  <button
                    type="button"
                    onClick={() => {
                      playSoftPop(1.25);
                      setActivePart('quotient');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-base sm:text-lg cursor-pointer transition-all whitespace-nowrap ${
                      activePart === 'quotient'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    商
                  </button>
                </div>
              </div>

              {/* Reading Highlight Card */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-amber-50 border-2 border-amber-300">
                <div className="text-xl sm:text-2xl font-bold text-[#3b2914] tabular-math">
                  读作：12
                  <span className="mx-1.5 px-2 py-0.5 rounded-lg bg-rose-500 text-white">
                    除以
                  </span>
                  {way.divisor}等于{way.quotient}
                </div>

                <div className="flex items-center gap-2 text-base font-bold text-rose-700 bg-rose-100/80 px-3.5 py-1.5 rounded-xl border border-rose-300 shrink-0">
                  <span>⚠️</span>
                  <span>乘是“乘”，除法要读作“除以”</span>
                </div>
              </div>

              {/* Wise Elder reminder */}
              <div className="flex items-center gap-3 self-end">
                <img
                  src={WISE_ELDER_IMG}
                  alt="智慧老人"
                  referrerPolicy="no-referrer"
                  className="w-14 h-16 object-contain"
                />
                <div className="px-4 py-2 rounded-2xl bg-[#fcf8ee] border border-[#dfcda9] text-base font-bold text-[#5c3d1e]">
                  {activePart === 'dividend' && '12 是被除数'}
                  {activePart === 'symbol' && '÷ 是除号，读作“除以”'}
                  {activePart === 'divisor' && `${way.divisor} 是除数`}
                  {activePart === 'quotient' && `${way.quotient} 是商`}
                  {!activePart && '÷ 读作“除以”'}
                </div>
              </div>
            </div>
          )}
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
          onClick={handleNextStep}
          className="min-h-[46px] px-8 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg shadow-md whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-all"
        >
          {!showReading
            ? wayIdx < DIVISION_WAYS.length - 1
              ? DIVISION_WAYS[wayIdx + 1].label
              : '读法'
            : '下一页'}
        </button>
      </div>
    </div>
  );
};
