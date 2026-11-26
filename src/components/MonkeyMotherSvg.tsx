import React from 'react';

interface MonkeyMotherSvgProps {
  mode: 'idle' | 'walk' | 'pick' | 'carry';
  facing?: 'left' | 'right';
  className?: string;
}

export const MonkeyMotherSvg: React.FC<MonkeyMotherSvgProps> = ({
  mode,
  facing = 'right',
  className = 'w-44 h-48',
}) => {
  const animClass =
    mode === 'walk' || mode === 'carry'
      ? 'animate-paper-walk'
      : mode === 'pick'
        ? 'animate-paper-pick'
        : 'animate-paper-twitch';

  const hasBananas = mode === 'carry' || mode === 'pick';

  return (
    <div
      className={`${className} ${animClass} paper-cutout origin-bottom`}
      style={{
        transform: facing === 'left' ? 'scaleX(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 180 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <g style={{ transform: facing === 'left' ? 'scale(-1, 1) translate(-180px, 0)' : undefined }}>
          {/* Tail */}
          <path
            d="M52 138C25 142 16 116 26 98C33 86 45 92 40 102"
            stroke="#FFFDF7"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M52 138C25 142 16 116 26 98C33 86 45 92 40 102"
            stroke="#8B5A2B"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          <path
            d="M52 138C25 142 16 116 26 98C33 86 45 92 40 102"
            stroke="#4A2C11"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0"
            opacity="0.35"
          />

          {/* Legs */}
          <path
            d="M74 152L68 180C67 185 75 186 78 182L85 154"
            fill="#8B5A2B"
            stroke="#4A2C11"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M104 152L112 180C114 185 106 186 102 182L95 154"
            fill="#8B5A2B"
            stroke="#4A2C11"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Feet */}
          <ellipse cx="70" cy="183" rx="10" ry="5.5" fill="#F5D0A9" stroke="#4A2C11" strokeWidth="2.8" />
          <ellipse cx="110" cy="183" rx="10" ry="5.5" fill="#F5D0A9" stroke="#4A2C11" strokeWidth="2.8" />

          {/* Body */}
          <ellipse cx="90" cy="126" rx="34" ry="38" fill="#8B5A2B" stroke="#4A2C11" strokeWidth="3.2" />
          {/* Warm Apron / Belly */}
          <path
            d="M66 114C66 104 114 104 114 114L118 150C106 158 74 158 62 150L66 114Z"
            fill="#FFF3E0"
            stroke="#4A2C11"
            strokeWidth="2.6"
          />
          {/* Apron pocket + bow */}
          <path
            d="M78 128C78 128 90 135 102 128V142C102 146 78 146 78 142V128Z"
            fill="#FDBA74"
            stroke="#4A2C11"
            strokeWidth="2"
          />
          {/* Mother scarf / kerchief */}
          <path
            d="M66 94C78 106 102 106 114 94C106 88 74 88 66 94Z"
            fill="#EF4444"
            stroke="#4A2C11"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Ears */}
          <circle cx="51" cy="60" r="14" fill="#8B5A2B" stroke="#4A2C11" strokeWidth="3" />
          <circle cx="51" cy="60" r="8" fill="#F5D0A9" />
          <circle cx="129" cy="60" r="14" fill="#8B5A2B" stroke="#4A2C11" strokeWidth="3" />
          <circle cx="129" cy="60" r="8" fill="#F5D0A9" />

          {/* Head */}
          <ellipse cx="90" cy="60" rx="36" ry="33" fill="#8B5A2B" stroke="#4A2C11" strokeWidth="3.2" />
          {/* Face mask */}
          <path
            d="M62 56C62 42 75 37 83 43C87 46 93 46 97 43C105 37 118 42 118 56C121 71 108 87 90 87C72 87 59 71 62 56Z"
            fill="#F5D0A9"
            stroke="#4A2C11"
            strokeWidth="2.2"
          />
          {/* Mother hair bow / flower on top */}
          <circle cx="110" cy="30" r="7" fill="#F43F5E" stroke="#4A2C11" strokeWidth="2.2" />
          <circle cx="118" cy="36" r="6" fill="#FB7185" stroke="#4A2C11" strokeWidth="2.2" />
          <circle cx="112" cy="35" r="3" fill="#FEF08A" />

          {/* Eyes */}
          <circle cx="77" cy="56" r="4.5" fill="#2F261D" />
          <circle cx="78.5" cy="54.5" r="1.6" fill="#FFFFFF" />
          <circle cx="103" cy="56" r="4.5" fill="#2F261D" />
          <circle cx="104.5" cy="54.5" r="1.6" fill="#FFFFFF" />

          {/* Rosy cheeks */}
          <ellipse cx="68" cy="66" rx="5.5" ry="3.2" fill="#FCA5A5" opacity="0.65" />
          <ellipse cx="112" cy="66" rx="5.5" ry="3.2" fill="#FCA5A5" opacity="0.65" />

          {/* Nose & warm smile */}
          <ellipse cx="90" cy="64" rx="4" ry="2.6" fill="#4A2C11" />
          <path
            d="M80 73C85 79 95 79 100 73"
            stroke="#4A2C11"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Arms */}
          {mode === 'pick' ? (
            <>
              <path
                d="M60 108C46 94 42 78 52 68"
                stroke="#8B5A2B"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M60 108C46 94 42 78 52 68"
                stroke="#4A2C11"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="52" cy="67" r="7" fill="#F5D0A9" stroke="#4A2C11" strokeWidth="2.4" />
              <path
                d="M120 108C136 92 142 74 132 62"
                stroke="#8B5A2B"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="132" cy="61" r="7" fill="#F5D0A9" stroke="#4A2C11" strokeWidth="2.4" />
            </>
          ) : (
            <>
              <path
                d="M58 106C44 116 44 130 58 134"
                stroke="#8B5A2B"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="58" cy="134" r="6.5" fill="#F5D0A9" stroke="#4A2C11" strokeWidth="2.4" />
              <path
                d="M122 106C136 116 136 130 122 134"
                stroke="#8B5A2B"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="122" cy="134" r="6.5" fill="#F5D0A9" stroke="#4A2C11" strokeWidth="2.4" />
            </>
          )}

          {/* Carried bunch of bananas */}
          {hasBananas && (
            <g transform={mode === 'pick' ? 'translate(105, 36) rotate(12)' : 'translate(66, 108)'}>
              <path
                d="M22 4C34 12 38 28 30 40C24 49 12 52 4 48C10 42 18 35 20 24C21 16 19 9 18 5L22 4Z"
                fill="#FACC15"
                stroke="#4A2C11"
                strokeWidth="2.2"
              />
              <path
                d="M30 6C42 14 46 30 38 42C32 51 20 54 12 50C18 44 26 37 28 26C29 18 27 11 26 7L30 6Z"
                fill="#FDE047"
                stroke="#4A2C11"
                strokeWidth="2.2"
              />
              <path
                d="M38 9C50 17 53 33 45 44C39 53 28 55 20 51C26 45 34 38 35 27C36 19 35 13 34 9L38 9Z"
                fill="#FEF08A"
                stroke="#4A2C11"
                strokeWidth="2.2"
              />
              <path
                d="M17 5C23 2 33 4 38 9"
                stroke="#713F12"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
