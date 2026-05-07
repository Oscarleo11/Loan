import React from 'react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Background Rounded Square */}
      <rect width="100" height="100" rx="24" fill="#22C55E" />
      
      {/* "M" and "L" stylized combination */}
      <path 
        d="M25 70V30L45 50L65 30V70" 
        stroke="white" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Currency/Growth Sparkle */}
      <circle cx="75" cy="25" r="8" fill="#BBF7D0" />
    </svg>
  );
}
