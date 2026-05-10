
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
        <defs>
          <linearGradient id="studio-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Isometric Cube - Representing 3D Portfolio Architecture */}
        <path 
          d="M50 10L90 30V70L50 90L10 70V30L50 10Z" 
          fill="url(#studio-gradient)" 
          fillOpacity="0.15"
          stroke="url(#studio-gradient)"
          strokeWidth="2"
        />
        
        {/* Top Face */}
        <path 
          d="M50 10L90 30L50 50L10 30L50 10Z" 
          fill="url(#studio-gradient)" 
          fillOpacity="0.8"
        />

        {/* Right Face */}
        <path 
          d="M50 50L90 30V70L50 90V50Z" 
          fill="url(#studio-gradient)" 
          fillOpacity="0.6"
        />

        {/* Left Face */}
        <path 
          d="M10 30L50 50V90L10 70V30Z" 
          fill="url(#studio-gradient)" 
          fillOpacity="0.4"
        />

        {/* Internal Structure Lines */}
        <path 
          d="M50 10V50M10 30L50 50M90 30L50 50M50 50V90" 
          stroke="white" 
          strokeWidth="1" 
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
};
