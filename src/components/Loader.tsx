
import React from 'react';

export function Loader({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizeClass = 
    size === "small" ? "h-6 w-6 border-2" :
    size === "large" ? "h-14 w-14 border-[3px]" :
    "h-10 w-10 border-2";
  
  return (
    <div 
      className={`inline-flex animate-spin rounded-full ${sizeClass} border-solid border-primary border-t-transparent`} 
      role="status" 
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
