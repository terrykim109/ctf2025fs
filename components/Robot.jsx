"use client";

import React from "react";

export default function Robot({ width = 120, height = 180 }) {
  const primaryColor = "#0055A4"; // Fundserv blue
  const accentColor = "#00A651";  // Fundserv green
  const metalColor = "#C0C0C0";
  const eyeColor = "#00FF00";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 180"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="robotBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
        <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A0A0A0" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>

      {/* Robot body */}
      <rect x="30" y="40" width="60" height="80" fill="url(#robotBody)" rx="10" />
      
      {/* Robot head */}
      <rect x="40" y="20" width="40" height="30" fill="url(#robotBody)" rx="8" />
      
      {/* Eyes */}
      <circle cx="50" cy="35" r="6" fill={eyeColor} />
      <circle cx="70" cy="35" r="6" fill={eyeColor} />
      <circle cx="50" cy="35" r="3" fill="#FFFFFF" />
      <circle cx="70" cy="35" r="3" fill="#FFFFFF" />
      
      {/* Antenna */}
      <rect x="58" y="10" width="4" height="10" fill={metalColor} />
      <circle cx="60" cy="8" r="4" fill="#FF0000" />
      
      {/* Arms */}
      <rect x="10" y="50" width="20" height="8" fill="url(#metal)" rx="4" />
      <rect x="90" y="50" width="20" height="8" fill="url(#metal)" rx="4" />
      
      {/* Hands */}
      <circle cx="15" cy="54" r="6" fill={metalColor} />
      <circle cx="105" cy="54" r="6" fill={metalColor} />
      
      {/* Legs */}
      <rect x="35" y="120" width="15" height="30" fill="url(#metal)" rx="5" />
      <rect x="70" y="120" width="15" height="30" fill="url(#metal)" rx="5" />
      
      {/* Feet */}
      <rect x="30" y="150" width="25" height="8" fill={metalColor} rx="3" />
      <rect x="65" y="150" width="25" height="8" fill={metalColor} rx="3" />
      
      {/* Chest details */}
      <rect x="45" y="60" width="30" height="15" fill={accentColor} rx="5" />
      <circle cx="50" cy="67" r="2" fill="#FFFFFF" />
      <circle cx="55" cy="67" r="2" fill="#FFFFFF" />
      <circle cx="60" cy="67" r="2" fill="#FFFFFF" />
      <circle cx="65" cy="67" r="2" fill="#FFFFFF" />
      <circle cx="70" cy="67" r="2" fill="#FFFFFF" />
    </svg>
  );
}