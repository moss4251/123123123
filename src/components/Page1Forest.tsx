import React, { useEffect, useState } from 'react';
import forestBg from '../assets/images/forest_banana_clearing_1795695777678.jpg';
import { BananaSvg } from './BananaSvg';
import { MonkeyMotherSvg } from './MonkeyMotherSvg';
import { playChime, playSoftPop } from '../utils/sound';

interface Page1ForestProps {
  onNext: () => void;
}

type StoryPhase = 'start' | 'toTree' | 'picking' | 'returning' | 'placing' | 'done';

export const Page1Forest: React.FC<Page1ForestProps> = ({ onNext }) => {
  const [phase, setPhase] = useState<StoryPhase>('start');
  const [placedCount, setPlacedCount] = useState<number>(0);
  const [activeBananaIdx, setActiveBananaIdx] = useState<number | null>(null);
  const [runKey, setRunKey] = useState<number>(0);

  useEffect(() => {
    setPhase('start');
    setPlacedCount(0);
    setActiveBananaIdx(null);

    const t1 = window.setTimeout(() => setPhase('toTree'), 250);
    const t2 = window.setTimeout(() => {
      setPhase('picking');
      playSoftPop(1.2);
    }, 1500);
    const t3 = window.setTimeout(() => {
      setPhase('returning');
      playSoftPop(1.0);
    }, 2900);
    const t4 = window.setTimeout(() => setPhase('placing'), 4200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [runKey]);

  useEffect(() => {
    if (phase !== 'placing') return;
    if (placedCount >= 12) {
      const doneTimer = window.setTimeout(() => {
        setPhase('done');
        playChime();
      }, 280);
      return () => window.clearTimeout(doneTimer);
    }
    const timer = window.setTimeout(() => {
      setPlacedCount((c) => {
        const next = c + 1;
        playSoftPop(0.9 + next * 0.04);
        return next;
      });
    }, 110);
    return () => window.clearTimeout(timer);
  }, [phase, placedCount]);

  const handleReplay = () => {
    playSoftPop(1);
    setRunKey((k) => k + 1);
  };

  const handleBananaClick = (idx: number) => {
    playSoftPop(0.9 + (idx + 1) * 0.04);
    setActiveBananaIdx(idx);
  };

  // Position & orientation of Monkey Mother across phases
  const monkeyStyle: React.CSSProperties = (() => {
    switch (phase) {
      case 'start':
        return { left: '70%', bottom: '20%', transition: 'left 1.15s ease-in-out' };
      case 'toTree':
        return { left: '23%', bottom: '21%', transition: 'left 1.2s ease-in-out' };
      case 'picking':
        return { left: '21%', bottom: '23%', transition: 'left 0.3s ease-out, bottom 0.3s ease-out' };
      case 'returning':
        return { left: '72%', bottom: '20%', transition: 'left 1.25s ease-in-out' };
      case 'placing':
      case 'done':
        return { left: '75%', bottom: '20%', transition: 'left 0.4s ease-out' };
    }
  })();

  const monkeyMode =
    phase === 'toTree'
      ? 'walk'
      : phase === 'picking'
        ? 'pick'
        : phase === 'returning'
          ? 'carry'
          : 'idle';

  const monkeyFacing: 'left' | 'right' =
    phase === 'start' || phase === 'toTree' || phase === 'picking' || phase === 'done'
      ? 'left'
      : 'right';

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f4ebd4]">
      {/* Storybook Forest Backdrop */}
      <img
        src={forestBg}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle warm vignette so foreground props pop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 60%, rgba(45, 32, 16, 0.22) 100%)',
        }}
      />

      {/* Interactive click hotspot on the banana tree to replay picking */}
      <button
        type="button"
        onClick={handleReplay}
        aria-label="摘香蕉"
        className="absolute left-[14%] top-[16%] w-[20%] h-[42%] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-amber-500"
      />

      {/* Tree banana bunch glow during picking */}
      {phase === 'picking' && (
        <div className="absolute left-[22.5%] top-[33%] w-16 h-16 rounded-full bg-amber-300/45 animate-ping pointer-events-none" />
      )}

      {/* 12 Bananas placed neatly on the forest clearing */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[17%] w-[min(680px,62vw)] flex items-end justify-center gap-1.5 sm:gap-2.5 px-4 py-3"
        aria-live="polite"
      >
        {Array.from({ length: 12 }).map((_, idx) => {
          const isPlaced = idx < placedCount;
          const isSelected = activeBananaIdx === idx;
          if (!isPlaced) {
            return <div key={idx} className="w-10 sm:w-12 h-14 opacity-0" />;
          }
          return (
            <button
              key={`${runKey}-${idx}`}
              type="button"
              onClick={() => handleBananaClick(idx)}
              className="group relative flex flex-col items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600 rounded-xl p-0.5 animate-banana-pop"
            >
              {isSelected && (
                <span className="absolute -top-7 px-2 py-0.5 rounded-lg bg-[#fffdf7]/95 text-[#9a3412] font-bold text-base shadow-sm tabular-math border border-amber-300">
                  {idx + 1}
                </span>
              )}
              <BananaSvg
                className="w-10 h-12 sm:w-12 sm:h-15 group-hover:-translate-y-1.5 transition-transform duration-150"
                highlighted={isSelected}
              />
            </button>
          );
        })}
      </div>

      {/* Count readout once all 12 bananas are on the ground */}
      {phase === 'done' && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[31%] animate-banana-pop pointer-events-none">
          <div className="px-5 py-1.5 rounded-2xl bg-[#fffdf7]/92 border-2 border-amber-400 shadow-md text-2xl font-bold text-[#78350f] tabular-math">
            12根
          </div>
        </div>
      )}

      {/* Monkey Mother (paper-cutout stop-motion) */}
      <div className="absolute z-10 pointer-events-none" style={monkeyStyle}>
        <MonkeyMotherSvg
          mode={monkeyMode}
          facing={monkeyFacing}
          className="w-36 h-40 sm:w-44 sm:h-48"
        />
      </div>

      {/* Action Controls */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={handleReplay}
          className="pointer-events-auto min-h-[46px] px-6 py-2.5 rounded-2xl bg-[#fffdf7]/95 hover:bg-amber-50 text-[#5c3d1e] border-2 border-[#d6b88d] shadow-md font-bold text-lg whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-amber-600"
        >
          {phase === 'done' ? '再看一遍' : '摘香蕉'}
        </button>

        <button
          type="button"
          onClick={onNext}
          className={`pointer-events-auto min-h-[48px] px-8 py-2.5 rounded-2xl font-bold text-lg whitespace-nowrap shrink-0 cursor-pointer shadow-lg transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-700 ${
            phase === 'done'
              ? 'bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-700/20'
              : 'bg-[#fffdf7]/90 hover:bg-amber-100 text-[#5c3d1e] border-2 border-[#d6b88d]'
          }`}
        >
          下一页
        </button>
      </div>
    </div>
  );
};
