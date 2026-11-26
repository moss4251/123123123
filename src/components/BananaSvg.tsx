import React from 'react';

interface BananaSvgProps {
  className?: string;
  dimmed?: boolean;
  highlighted?: boolean;
}

export const BananaSvg: React.FC<BananaSvgProps> = ({
  className = 'w-12 h-14',
  dimmed = false,
  highlighted = false,
}) => {
  return (
    <svg
      viewBox="0 0 64 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-150 ${
        dimmed ? 'opacity-45 grayscale-[25%]' : 'opacity-100'
      } ${highlighted ? 'scale-110' : ''}`}
      aria-hidden="true"
    >
      {/* White paper-cutout backing outline */}
      <path
        d="M36 7C39 10 38 14 36 17C44 26 48 40 43 52C38 64 25 70 14 67C10 66 8 62 11 59C16 54 24 49 27 40C30 31 28 21 26 16C25 13 28 8 31 6C33 5 35 6 36 7Z"
        stroke="#FFFDF7"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Shadow silhouette */}
      <path
        d="M35 16C43 25 47 39 42 51C37 63 25 69 15 66C11 65 9 61 12 58C18 53 25 48 28 39C31 30 29 21 27 16L35 16Z"
        fill="#FACC15"
        stroke="#4A3219"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Warm golden highlight belly */}
      <path
        d="M33 21C39 29 41 40 37 50C33 59 24 63 17 62C22 57 28 51 31 41C33 34 32 27 30 21H33Z"
        fill="#FEF08A"
      />
      {/* Subtle contour ridge */}
      <path
        d="M31 20C36 29 38 41 33 51C29 58 23 62 18 63"
        stroke="#D97706"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Banana stem */}
      <path
        d="M27 16C26 12 28 8 32 7C34 7 36 9 35 12C35 14 34 15 35 16"
        fill="#854D0E"
        stroke="#4A3219"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dark tip */}
      <circle cx="12.5" cy="62" r="2.1" fill="#4A3219" />
    </svg>
  );
};
