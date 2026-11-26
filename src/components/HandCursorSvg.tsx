import React from 'react';

interface HandCursorSvgProps {
  className?: string;
}

export const HandCursorSvg: React.FC<HandCursorSvgProps> = ({ className = 'w-9 h-9' }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M27 11C27 8.5 29 6.5 31.5 6.5C34 6.5 36 8.5 36 11V28H39.5C41.8 28 43.5 29.8 43.5 32V32.5H46C48.2 32.5 50 34.3 50 36.5V41C50 50.5 43 57.5 33.5 57.5H27.5C21 57.5 16.5 53 14.5 46.5L10.5 34.5C9.7 32.2 11 29.7 13.3 29C15.5 28.3 17.8 29.4 18.8 31.4L22 38V11C22 8.5 24.5 6.5 27 6.5"
        fill="#FDE6C4"
        stroke="#4A2C11"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M27 12V32" stroke="#4A2C11" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M36 28V35" stroke="#4A2C11" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M43.5 32V38" stroke="#4A2C11" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
};
