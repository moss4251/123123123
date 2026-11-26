import React, { useState } from 'react';
import { BananaSvg } from './BananaSvg';
import { HandCursorSvg } from './HandCursorSvg';
import { SHARING_WAYS, WISE_ELDER_IMG } from '../data/divisionData';
import { playChime, playSoftPop } from '../utils/sound';

interface Page2ExploreProps {
  onPrev: () => void;
  onNext: () => void;
}

type ExploreMode = 'idle' | 'subtract' | 'hand' | 'all';

export const Page2Explore: React.FC<Page2ExploreProps> = ({ onPrev, onNext }) => {
  const [mode, setMode] = useState<ExploreMode>('idle');

  // Subtraction mode state (虚线框删减模式)
  const [subGroups, setSubGroups] = useState<number[]>([]);
  const [hoverBoxCount, setHoverBoxCount] = useState<number | null>(null);
  const [dragStartIdx, setDragStartIdx] = useState<number | null>(null);
  const [dragEndIdx, setDragEndIdx] = useState<number | null>(null);
  const [showSubResult, setShowSubResult] = useState<boolean>(false);

  // Hand grouping mode state (小手分组乘法模式)
  const [handPerGroup, setHandPerGroup] = useState<number | null>(null);
  const [hoverHandSize, setHoverHandSize] = useState<number | null>(null);
  const [handUnevenMsg, setHandUnevenMsg] = useState<string | null>(null);

  // Wise Elder appearance after viewing all possibilities
  const [showElder, setShowElder] = useState<boolean>(false);

  const boxedTotal = subGroups.reduce((acc, n) => acc + n, 0);
  const remainingCount = 12 - boxedTotal;

  const enterSubtractMode = () => {
    playSoftPop(1.05);
    setMode('subtract');
    setSubGroups([]);
    setHoverBoxCount(null);
    setDragStartIdx(null);
    setDragEndIdx(null);
    setShowSubResult(false);
    setHandUnevenMsg(null);
  };

  const enterHandMode = () => {
    playSoftPop(1.15);
    setMode('hand');
    setHandPerGroup(null);
    setHoverHandSize(null);
    setHandUnevenMsg(null);
  };

  const enterAllMode = () => {
    playChime();
    setMode('all');
    setHandUnevenMsg(null);
    setShowElder(true);
  };

  const addSubtractBox = (count: number) => {
    if (count <= 0 || count > remainingCount) return;
    playSoftPop(0.95 + subGroups.length * 0.08);
    setSubGroups((prev) => [...prev, count]);
    setHoverBoxCount(null);
    setDragStartIdx(null);
    setDragEndIdx(null);
    setShowSubResult(false);
  };

  const handleBananaPointerDown = (remainingIdx: number) => {
    if (mode !== 'subtract') return;
    setDragStartIdx(remainingIdx);
    setDragEndIdx(remainingIdx);
  };

  const handleBananaPointerEnter = (remainingIdx: number) => {
    if (mode === 'subtract') {
      if (dragStartIdx !== null) {
        setDragEndIdx(remainingIdx);
      } else {
        setHoverBoxCount(remainingIdx + 1);
      }
    } else if (mode === 'hand') {
      setHoverHandSize(remainingIdx + 1);
    }
  };

  const handleBananaPointerUp = (remainingIdx: number) => {
    if (mode !== 'subtract') return;
    if (dragStartIdx !== null) {
      const count = Math.max(dragStartIdx, remainingIdx) + 1;
      addSubtractBox(count);
    } else {
      addSubtractBox(remainingIdx + 1);
    }
  };

  const handleHandClickBanana = (idx: number) => {
    if (mode !== 'hand') return;
    const perGroup = idx + 1;
    if (12 % perGroup === 0 && perGroup < 12) {
      playChime();
      setHandPerGroup(perGroup);
      setHandUnevenMsg(null);
    } else if (perGroup === 12) {
      playSoftPop(0.8);
      setHandPerGroup(null);
      setHandUnevenMsg('不能只分成1份');
    } else {
      playSoftPop(0.75);
      setHandPerGroup(null);
      setHandUnevenMsg(`每份${perGroup}根，还剩${12 % perGroup}根`);
    }
  };

  const handleHandPreset = (groups: number) => {
    playChime();
    setHandPerGroup(12 / groups);
    setHandUnevenMsg(null);
  };

  const activePreviewCount =
    dragStartIdx !== null && dragEndIdx !== null
      ? Math.max(dragStartIdx, dragEndIdx) + 1
      : hoverBoxCount;

  const isSubCompleteEqual =
    subGroups.length >= 2 &&
    remainingCount === 0 &&
    subGroups.every((n) => n === subGroups[0]);

  const isSubUneven =
    subGroups.length > 0 &&
    (remainingCount === 0
      ? !subGroups.every((n) => n === subGroups[0])
      : subGroups.some((n) => n !== subGroups[0]) || remainingCount < subGroups[0]);

  const handGroupCount = handPerGroup ? 12 / handPerGroup : 0;

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#fbf6ea] px-6 py-5 overflow-hidden">
      {/* Top Question & Equation Bar */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-2.5 shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#3b2914] tracking-tight text-center text-balance">
          猴子妈妈想把这12根香蕉平均分，可以怎么分呢？
        </h1>

        {mode !== 'idle' && (
          <div className="text-base sm:text-lg font-bold text-[#b45309] animate-banana-pop">
            用算式试着说说你的意思
          </div>
        )}

        {/* Live Subtraction Equation (no auto-result until revealed) */}
        {mode === 'subtract' && (
          <div className="flex flex-wrap items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-[#fffdf8] border-2 border-amber-300 shadow-sm min-h-[56px]">
            <span className="text-2xl sm:text-3xl font-bold text-[#3b2914] tabular-math">12</span>
            {subGroups.map((n, i) => (
              <React.Fragment key={i}>
                <span className="text-2xl sm:text-3xl font-bold text-amber-600">−</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#9a3412] tabular-math px-1.5 py-0.5 rounded-lg bg-amber-100">
                  {n}
                </span>
              </React.Fragment>
            ))}

            {subGroups.length > 0 && !showSubResult && (
              <button
                type="button"
                onClick={() => {
                  playChime();
                  setShowSubResult(true);
                }}
                className="ml-2 px-4 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xl cursor-pointer transition-colors shadow-sm whitespace-nowrap"
              >
                = ?
              </button>
            )}

            {subGroups.length > 0 && showSubResult && (
              <>
                <span className="text-2xl sm:text-3xl font-bold text-amber-600">=</span>
                <span
                  className={`text-2xl sm:text-3xl font-bold tabular-math px-2.5 py-0.5 rounded-lg ${
                    remainingCount === 0
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {remainingCount}
                </span>
              </>
            )}

            {remainingCount > 0 && isSubUneven && (
              <span className="ml-2 text-base font-bold text-rose-600">
                还剩{remainingCount}根
              </span>
            )}
            {isSubCompleteEqual && showSubResult && (
              <span className="ml-2 text-base font-bold text-emerald-700">
                {subGroups.length}个{subGroups[0]}
              </span>
            )}
          </div>
        )}

        {/* Live Multiplication Equation from Hand Grouping */}
        {mode === 'hand' && (
          <div className="flex items-center justify-center gap-3 px-6 py-2.5 rounded-2xl bg-[#fffdf8] border-2 border-sky-300 shadow-sm min-h-[56px]">
            {handPerGroup ? (
              <div className="flex items-center gap-4 animate-banana-pop">
                <span className="text-xl sm:text-2xl font-bold text-sky-700">
                  {handGroupCount}个{handPerGroup}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-[#3b2914] tabular-math">
                  {handGroupCount} × {handPerGroup} = 12
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-rose-600 tabular-math">
                {handUnevenMsg ?? '12'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Stage Area */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-2 min-h-0">
        {mode === 'all' ? (
          /* Show All 4 Possibilities (2个6, 6个2, 3个4, 4个3) */
          <div className="w-full grid grid-cols-2 gap-4 items-stretch">
            {SHARING_WAYS.map((way) => (
              <div
                key={way.id}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#fffdf8] border-2 shadow-sm animate-banana-pop"
                style={{ borderColor: way.borderColor }}
              >
                <div className="flex items-center gap-2.5 shrink-0">
                  <img
                    src={way.characterImg}
                    alt={way.characterName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold" style={{ color: way.color }}>
                      {way.phrase}
                    </span>
                    <span className="text-base font-bold text-[#3b2914] tabular-math">
                      {way.groups} × {way.perGroup} = 12
                    </span>
                  </div>
                </div>

                {/* Grouped bananas */}
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  {Array.from({ length: way.groups }).map((_, gIdx) => (
                    <div
                      key={gIdx}
                      className="flex items-center gap-0.5 px-1.5 py-1 rounded-xl border-2 border-dashed"
                      style={{
                        borderColor: way.borderColor,
                        backgroundColor: way.bgTint,
                      }}
                    >
                      {Array.from({ length: way.perGroup }).map((_, bIdx) => (
                        <BananaSvg key={bIdx} className="w-5 h-6 sm:w-6 sm:h-8" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Interactive Banana Row + Side Tools (虚线框 & 小手) */
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full flex flex-wrap items-center justify-center gap-5">
              {/* Subtract Mode: Already boxed groups arranged neatly */}
              {mode === 'subtract' && subGroups.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {subGroups.map((count, gIdx) => (
                    <div
                      key={gIdx}
                      className="flex flex-col items-center px-2.5 py-2 rounded-2xl border-2 border-dashed border-amber-500 bg-amber-100/70 animate-banana-pop"
                    >
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: count }).map((_, bIdx) => (
                          <BananaSvg key={bIdx} className="w-8 h-10 sm:w-9 sm:h-12" dimmed />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-amber-800 tabular-math">
                        −{count}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hand Mode: Grouped result */}
              {mode === 'hand' && handPerGroup ? (
                <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-4 rounded-3xl bg-[#fffdf8] border-2 border-sky-200 shadow-sm">
                  {Array.from({ length: handGroupCount }).map((_, gIdx) => (
                    <div
                      key={gIdx}
                      className="relative flex items-center gap-1 px-3 py-2.5 rounded-2xl border-2 border-dashed border-sky-500 bg-sky-50/80 animate-banana-pop"
                    >
                      {Array.from({ length: handPerGroup }).map((_, bIdx) => (
                        <BananaSvg key={bIdx} className="w-9 h-12 sm:w-11 sm:h-14" />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                /* Active Remaining Bananas Row */
                remainingCount > 0 && (
                  <div
                    className="relative flex items-center justify-center gap-1 sm:gap-2 px-5 py-4 rounded-3xl bg-[#fffdf8] border-2 border-[#e5d5b5] shadow-sm"
                    onMouseLeave={() => {
                      setHoverBoxCount(null);
                      setHoverHandSize(null);
                      setDragStartIdx(null);
                      setDragEndIdx(null);
                    }}
                  >
                    {Array.from({ length: remainingCount }).map((_, idx) => {
                      const inSubPreview =
                        mode === 'subtract' &&
                        activePreviewCount !== null &&
                        idx < activePreviewCount;
                      const inHandPreview =
                        mode === 'hand' && hoverHandSize !== null && idx < hoverHandSize;
                      const isSplitBoundary =
                        mode === 'hand' &&
                        hoverHandSize !== null &&
                        hoverHandSize < 12 &&
                        12 % hoverHandSize === 0 &&
                        (idx + 1) % hoverHandSize === 0 &&
                        idx < 11;

                      return (
                        <React.Fragment key={idx}>
                          <button
                            type="button"
                            onMouseDown={() => handleBananaPointerDown(idx)}
                            onMouseEnter={() => handleBananaPointerEnter(idx)}
                            onMouseUp={() => handleBananaPointerUp(idx)}
                            onClick={() => {
                              if (mode === 'hand') {
                                handleHandClickBanana(idx);
                              } else if (mode === 'idle') {
                                playSoftPop(0.95 + idx * 0.04);
                              }
                            }}
                            className={`relative p-1 rounded-xl transition-all duration-100 cursor-pointer ${
                              inSubPreview
                                ? 'bg-amber-100/90 ring-2 ring-dashed ring-amber-500 -translate-y-1'
                                : inHandPreview
                                  ? 'bg-sky-100/90 ring-2 ring-dashed ring-sky-500 -translate-y-1'
                                  : 'hover:-translate-y-1'
                            }`}
                          >
                            {inSubPreview && idx === (activePreviewCount ?? 1) - 1 && (
                              <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-amber-500 text-white text-xs font-bold tabular-math">
                                {activePreviewCount}
                              </span>
                            )}
                            {inHandPreview && idx === (hoverHandSize ?? 1) - 1 && (
                              <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-sky-500 text-white text-xs font-bold tabular-math">
                                {hoverHandSize}
                              </span>
                            )}
                            <BananaSvg className="w-9 h-12 sm:w-12 sm:h-16" />
                          </button>
                          {isSplitBoundary && (
                            <div className="w-0.5 h-14 border-r-2 border-dashed border-sky-400 mx-0.5" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                )
              )}

              {/* Tool Dock Right Beside the Bananas: 虚线框 + 小手 */}
              <div className="flex sm:flex-col items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={enterSubtractMode}
                  className={`min-w-[112px] min-h-[64px] px-4 py-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-150 border-2 border-dashed active:scale-95 ${
                    mode === 'subtract'
                      ? 'bg-amber-100 border-amber-600 text-amber-900 shadow-md scale-105'
                      : 'bg-[#fffdf8] border-amber-400 text-[#6b4423] hover:bg-amber-50'
                  }`}
                >
                  <div className="w-8 h-5 rounded border-2 border-dashed border-amber-600 bg-amber-200/40" />
                  <span className="text-sm font-bold whitespace-nowrap">虚线框</span>
                </button>

                <button
                  type="button"
                  onClick={enterHandMode}
                  className={`min-w-[112px] min-h-[64px] px-4 py-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-150 border-2 active:scale-95 ${
                    mode === 'hand'
                      ? 'bg-sky-100 border-sky-600 text-sky-900 shadow-md scale-105'
                      : 'bg-[#fffdf8] border-sky-300 text-[#1e40af] hover:bg-sky-50'
                  }`}
                >
                  <HandCursorSvg className="w-7 h-7" />
                  <span className="text-sm font-bold whitespace-nowrap">小手</span>
                </button>
              </div>
            </div>

            {/* Secondary quick controls inside Subtract or Hand mode */}
            {mode === 'subtract' && (
              <div className="flex items-center gap-2.5">
                {[6, 2, 4, 3].map((step) => (
                  <button
                    key={step}
                    type="button"
                    disabled={remainingCount < step}
                    onClick={() => addSubtractBox(step)}
                    className={`min-h-[42px] px-4 py-1.5 rounded-xl font-bold text-base tabular-math border-2 transition-all cursor-pointer whitespace-nowrap ${
                      remainingCount >= step
                        ? 'bg-[#fffdf8] border-amber-300 text-[#78350f] hover:bg-amber-100'
                        : 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    框{step}根
                  </button>
                ))}
                {subGroups.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        playSoftPop(0.85);
                        setSubGroups((prev) => prev.slice(0, -1));
                        setShowSubResult(false);
                      }}
                      className="min-h-[42px] px-4 py-1.5 rounded-xl font-bold text-base bg-[#fffdf8] border-2 border-stone-300 text-stone-700 hover:bg-stone-100 cursor-pointer whitespace-nowrap"
                    >
                      退一步
                    </button>
                    <button
                      type="button"
                      onClick={enterSubtractMode}
                      className="min-h-[42px] px-4 py-1.5 rounded-xl font-bold text-base bg-[#fffdf8] border-2 border-stone-300 text-stone-700 hover:bg-stone-100 cursor-pointer whitespace-nowrap"
                    >
                      重置
                    </button>
                  </>
                )}
              </div>
            )}

            {mode === 'hand' && (
              <div className="flex items-center gap-2.5">
                {[2, 6, 3, 4].map((groups) => (
                  <button
                    key={groups}
                    type="button"
                    onClick={() => handleHandPreset(groups)}
                    className={`min-h-[42px] px-4 py-1.5 rounded-xl font-bold text-base tabular-math border-2 transition-all cursor-pointer whitespace-nowrap ${
                      handGroupCount === groups
                        ? 'bg-sky-500 border-sky-600 text-white shadow-sm'
                        : 'bg-[#fffdf8] border-sky-300 text-sky-800 hover:bg-sky-50'
                    }`}
                  >
                    分成{groups}份
                  </button>
                ))}
                {handPerGroup && (
                  <button
                    type="button"
                    onClick={enterHandMode}
                    className="min-h-[42px] px-4 py-1.5 rounded-xl font-bold text-base bg-[#fffdf8] border-2 border-stone-300 text-stone-700 hover:bg-stone-100 cursor-pointer whitespace-nowrap"
                  >
                    重置
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Wise Elder Speech Area (appears after showing all 4 ways) */}
      {showElder && mode === 'all' && (
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-4 mb-1 animate-character-enter shrink-0">
          <img
            src={WISE_ELDER_IMG}
            alt="智慧老人"
            referrerPolicy="no-referrer"
            className="w-20 h-24 sm:w-24 sm:h-28 object-contain shrink-0"
          />
          <div className="px-6 py-3 rounded-2xl bg-[#fffdf8] border-2 border-amber-400 shadow-md text-lg sm:text-xl font-bold text-[#3b2914]">
            以上这些分法都可以用除法算式来表示。
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 shrink-0 pt-1">
        <button
          type="button"
          onClick={onPrev}
          className="min-h-[46px] px-6 py-2 rounded-2xl bg-[#fffdf8] hover:bg-amber-50 text-[#5c3d1e] border-2 border-[#d6b88d] font-bold text-lg whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-all"
        >
          上一页
        </button>

        <div className="flex items-center gap-3">
          {mode !== 'all' ? (
            <button
              type="button"
              onClick={enterAllMode}
              className="min-h-[46px] px-7 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-md whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-all"
            >
              全部展示
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                playSoftPop(1);
                setMode('idle');
              }}
              className="min-h-[46px] px-6 py-2 rounded-2xl bg-[#fffdf8] hover:bg-amber-50 text-[#5c3d1e] border-2 border-[#d6b88d] font-bold text-lg whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-all"
            >
              继续分一分
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            className={`min-h-[46px] px-8 py-2 rounded-2xl font-bold text-lg whitespace-nowrap shrink-0 cursor-pointer shadow-md active:scale-95 transition-all ${
              showElder
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-[#fffdf8] hover:bg-amber-100 text-[#5c3d1e] border-2 border-[#d6b88d]'
            }`}
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
};
