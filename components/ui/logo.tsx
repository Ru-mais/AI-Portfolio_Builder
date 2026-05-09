import React from 'react';

export const Logo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" /> {/* indigo-600 */}
            <stop offset="100%" stopColor="#9333ea" /> {/* purple-600 */}
          </linearGradient>
        </defs>

        {/* Main "L" Stem */}
        <rect x="20" y="15" width="12" height="70" rx="4" fill="currentColor" className="text-slate-900 dark:text-white" />
        
        {/* Main "L" Base */}
        <rect x="20" y="73" width="50" height="12" rx="4" fill="currentColor" className="text-slate-900 dark:text-white" />

        {/* The three gradient bars from the Legacy logo */}
        <rect x="40" y="25" width="35" height="10" rx="3" fill="url(#logo-gradient)" opacity="0.9" />
        <rect x="40" y="40" width="45" height="10" rx="3" fill="url(#logo-gradient)" opacity="0.8" />
        <rect x="40" y="55" width="55" height="10" rx="3" fill="url(#logo-gradient)" opacity="0.7" />
      </svg>
    </div>
  );
};
