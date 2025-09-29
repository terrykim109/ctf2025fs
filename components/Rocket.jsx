"use client";

import React from "react";

export default function Rocket({ width = 100, height = 200 }) {
  const primaryColor = "#0055A4";
  const accentColor = "#00A651";
  const windowColor = "#B3E0FF";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 200"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
      </defs>

      {/* Rocket body */}
      <rect x="30" y="40" width="40" height="100" fill="url(#rocketBody)" rx="20" />
      
      {/* Rocket nose */}
      <path d="M50 20 L70 40 L30 40 Z" fill={primaryColor} />
      
      {/* Main window */}
      <circle cx="50" cy="80" r="12" fill={windowColor} />
      <circle cx="50" cy="80" r="6" fill="#E6F7FF" />
      
      {/* Side windows */}
      <circle cx="35" cy="60" r="4" fill={windowColor} />
      <circle cx="65" cy="60" r="4" fill={windowColor} />
      <circle cx="35" cy="100" r="4" fill={windowColor} />
      <circle cx="65" cy="100" r="4" fill={windowColor} />
      
      {/* Fins */}
      <path d="M30 140 L15 170 L30 150 Z" fill="#003366" />
      <path d="M70 140 L85 170 L70 150 Z" fill="#003366" />
      
      {/* Details */}
      <rect x="30" y="120" width="40" height="3" fill="#FFD700" />
    </svg>
  );
}